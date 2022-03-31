import { promises as fs } from 'fs';
import * as path from 'path';
import * as img from '../utilities/imageMethods';

describe('processing images using jimp', (): void => {
  describe('function defineThmb tests', (): void => {
    it('errMsg where hight has wrong value', async (): Promise<void> => {
      const errMsg: undefined | string = await img.default.defineThmb({
        imgName: 'amoudi',
        width: '800',
        height: '-300'
      });
      expect(errMsg).toBe(
        'Jimp failed to Create image thumb and process with the image.'
      );
    });

    it('errMsg where img name doesnt exist', async (): Promise<void> => {
      const errMsg: undefined | string = await img.default.defineThmb({
        imgName: 'amoudi',
        width: '111',
        height: '222'
      });
      expect(errMsg).toBeTruthy();
    });

    it('writing thumb image success', async (): Promise<void> => {
      await img.default.defineThmb({
        imgName: 'ghazal',
        height: '180',
        width: '180'
      });

      const newImg: string = path.resolve(
        img.default.thumbingPath,
        `ghazal-w180-h180.jpg`
      );
      let errMsg: undefined | string = '';

      try {
        await fs.access(newImg);
        errMsg = 'image created';
      } catch {
        errMsg = 'img was not created';
      }

      expect(errMsg).toEqual('image created');
    });
  });
});

afterAll(async (): Promise<void> => {
  const newImg: string = path.resolve(
    img.default.thumbingPath,
    'horse-w199-h199.jpg'
  );

  let errMsg: void | string;
  try {
    errMsg = await fs.access(newImg);
    await fs.unlink(newImg);
    expect(errMsg).not.toBeDefined();
  } catch {
    console.log(errMsg);
    expect(errMsg).not.toBeDefined();
  }
});
