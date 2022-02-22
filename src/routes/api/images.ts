import express, { Request, Response } from 'express';
import path from 'path';
import { resizeImage } from '../../utilities/imageProcessor';
import {
  fileExistInFull,
  fileExistInThumb
} from '../../utilities/assetsHelpers';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const filename = req.query.filename as string;
  if (!filename || !(await fileExistInFull(filename))) {
    res.status(404).end('Please enter a proper file name.');
    return;
  }

  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (isNaN(width) && isNaN(height)) {
    const imgInput = path.resolve(`assets/full/${filename}.jpg`);
    res.sendFile(imgInput);
    return;
  }

  if (await fileExistInThumb(filename, width, height)) {
    const imgInput = path.resolve(
      `assets/thumb/${filename}@${width}x${height}.jpg`
    );
    res.sendFile(imgInput);
    return;
  }

  if (await resizeImage(filename, width, height)) {
    const imgInput = path.resolve(
      `assets/thumb/${filename}@${width}x${height}.jpg`
    );
    res.sendFile(imgInput);
    return;
  } else {
    res.status(500).end('Server could not perform this operation.');
    return;
  }
});

export default images;
