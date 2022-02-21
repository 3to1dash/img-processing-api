import path from 'path';
import sharp from 'sharp';

async function resizeImage(imgName: string, width: number, height: number) {
  const imgInput = path.resolve(`assets/full/${imgName}.jpg`);
  const imgOutput = path.resolve(
    `assets/thumb/${imgName}@${width}x${height}.jpg`
  );

  try {
    await sharp(imgInput).resize(width, height).toFile(imgOutput);
    return true;
  } catch (err) {
    return false;
  }
}

async function imageMetadata(imgName: string) {
  const imgInput = path.resolve(`assets/full/${imgName}.jpg`);

  return await sharp(imgInput).metadata();
}

export { resizeImage, imageMetadata };
