import path from 'path';
import fs from 'fs/promises';
import { resizeImage } from '../../utilities/imageProcessor';

describe('imageProcessor', () => {
  let filename: string;
  let width: number;
  let height: number;

  beforeAll(() => {
    filename = 'fjord';
    width = 400;
    height = 500;
  });

  it('resizeImage returns true with valid width and height', async () => {
    expect(await resizeImage(filename, width, height)).toBe(true);
  });

  it('resizeImage returns false with invalid width and height', async () => {
    expect(await resizeImage(filename, -1, height)).toBe(false);
  });

  it('resizeImage saves the image to the thumb folder', async () => {
    await resizeImage(filename, width, height);
    const assetsThumbDir = path.resolve(`assets/thumb/`);
    const filesList = await fs.readdir(assetsThumbDir);
    expect(filesList.includes(`${filename}@${width}x${height}.jpg`)).toBeTruthy;
  });
});
