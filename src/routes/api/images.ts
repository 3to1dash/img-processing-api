import express from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const images = express.Router();

async function processedImage(imgName: string, width: number, height: number) {
  const imgInput = path.normalize(
    `${__dirname}/../../../assets/full/${imgName}.jpg`
  );
  const imgOutput = path.normalize(
    `${__dirname}/../../../assets/thumb/${imgName}@${width}x${height}.jpg`
  );

  try {
    await sharp(imgInput).resize(width, height).toFile(imgOutput);
    return true;
  } catch (err) {
    return false;
  }
}

async function imageMetadata(imgName: string) {
  const imgInput = path.normalize(
    `${__dirname}/../../../assets/full/${imgName}.jpg`
  );

  return await sharp(imgInput).metadata();
}

async function fileExistInFull(filename: string) {
  let exist = false;

  const assetsFullDir = path.resolve(`${__dirname}/../../../assets/full/`);
  const filesList = await fs.readdir(assetsFullDir);

  if (filesList.includes(`${filename}.jpg`)) exist = true;
  return exist;
}

async function fileExistInThumb(
  filename: string,
  width: number,
  height: number
) {
  let exist = false;

  const assetsThumbDir = path.resolve(`${__dirname}/../../../assets/thumb/`);
  const filesList = await fs.readdir(assetsThumbDir);

  if (filesList.includes(`${filename}@${width}x${height}.jpg`)) exist = true;
  return exist;
}

images.get('/', async (req, res) => {
  const filename = req.query.filename as string;
  if (!filename || !(await fileExistInFull(filename))) {
    return res.status(404).end('Please enter a proper file name.');
  }

  let width = parseInt(req.query.width as string);
  let height = parseInt(req.query.height as string);
  if (width < 1 || height < 1) {
    return res.status(501).end('Please enter a valid width and height.');
  }

  if (isNaN(width) && isNaN(height)) {
    const imgInput = path.normalize(
      `${__dirname}/../../../assets/full/${filename}.jpg`
    );
    return res.sendFile(imgInput);
  }

  if (!width) width = (await imageMetadata(filename)).width as number;
  if (!height) height = (await imageMetadata(filename)).height as number;

  if (await fileExistInThumb(filename, width, height)) {
    const imgInput = path.normalize(
      `${__dirname}/../../../assets/thumb/${filename}@${width}x${height}.jpg`
    );
    return res.sendFile(imgInput);
  }

  if (await processedImage(filename, width, height)) {
    const imgInput = path.normalize(
      `${__dirname}/../../../assets/thumb/${filename}@${width}x${height}.jpg`
    );
    return res.sendFile(imgInput);
  } else {
    return res.status(500).end('Server could not perform this operation.');
  }
});

export default images;
