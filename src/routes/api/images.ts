import express from 'express';
import path from 'path';
import { resizeImage, imageMetadata } from '../../utilities/imageProcessor';
import {
  fileExistInFull,
  fileExistInThumb
} from '../../utilities/assetsHelpers';

const images = express.Router();

images.get('/', async (req, res) => {
  const filename = req.query.filename as string;
  if (!filename || !(await fileExistInFull(filename))) {
    return res.status(404).end('Please enter a proper file name.');
  }

  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  if (isNaN(width) && isNaN(height)) {
    const imgInput = path.resolve(`assets/full/${filename}.jpg`);
    return res.sendFile(imgInput);
  }

  if (await fileExistInThumb(filename, width, height)) {
    const imgInput = path.resolve(
      `assets/thumb/${filename}@${width}x${height}.jpg`
    );
    return res.sendFile(imgInput);
  }

  if (await resizeImage(filename, width, height)) {
    const imgInput = path.resolve(
      `assets/thumb/${filename}@${width}x${height}.jpg`
    );
    return res.sendFile(imgInput);
  } else {
    return res.status(500).end('Server could not perform this operation.');
  }
});

export default images;
