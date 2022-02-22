import path from 'path';
import fs from 'fs/promises';

async function fileExistInFull(filename: string): Promise<boolean> {
  let exist = false;

  const assetsFullDir = path.resolve(`assets/full/`);
  const filesList = await fs.readdir(assetsFullDir);

  if (filesList.includes(`${filename}.jpg`)) exist = true;
  return exist;
}

async function fileExistInThumb(
  filename: string,
  width: number,
  height: number
): Promise<boolean> {
  let exist = false;

  const assetsThumbDir = path.resolve(`assets/thumb/`);
  const filesList = await fs.readdir(assetsThumbDir);

  if (filesList.includes(`${filename}@${width}x${height}.jpg`)) exist = true;
  return exist;
}

export { fileExistInFull, fileExistInThumb };
