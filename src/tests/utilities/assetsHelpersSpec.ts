import {
  fileExistInFull,
  fileExistInThumb
} from '../../utilities/assetsHelpers';

describe('assets helpers module for checking if the image exists in the assets folder', () => {
  describe('fileExistInFull check if the file exists in assets/full folder', () => {
    it('fileExistInFull should return true if the file exists', () => {
      const filename = 'fjord';

      expect(fileExistInFull(filename)).toBeTruthy;
    });
    it('fileExistInFull should return false if the file does not exist', () => {
      const filename = 'abc';

      expect(fileExistInFull(filename)).toBeFalsy;
    });
  });

  describe('fileExistInThumb check if the file exists in assets/thumb folder', () => {
    it('fileExistInFull should return false if the file does not exist', () => {
      const filename = 'abc';
      const width = 300;
      const height = 343;

      expect(fileExistInThumb(filename, width, height)).toBeFalsy;
    });
  });
});
