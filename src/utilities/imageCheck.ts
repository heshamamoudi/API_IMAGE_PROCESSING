import { promises as fs } from 'fs';
import * as path from 'path';
import * as methods from './imageMethods';

// image interface to make it easier and with less errors
interface imgs {
  imgName?: string;
  width?: string;
  height?: string;
}

const thumbExists = async (fields: imgs): Promise<boolean> => {
  let imgPath: string;
  switch (true) {
    case fields.imgName === undefined ||
      fields.width === undefined ||
      fields.height === undefined:
      return false;
    case fields:
      //joining img bath with thumb path
      imgPath = path.resolve(
        methods.default.thumbingPath,
        `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`
      );

      try {
        await fs.access(imgPath);
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
};

/**
 * checking if directory exists if not create it
 */
const checkThumbDir = async (): Promise<void> => {
  try {
    await fs.access(methods.default.thumbingPath);
    // directory exists
  } catch {
    //creating directory
    fs.mkdir(methods.default.thumbingPath);
  }
};

const checkOriginDir = async (): Promise<void> => {
  try {
    await fs.access(methods.default.originPath);
    // directory exists
  } catch {
    //creating directory
    fs.mkdir(methods.default.originPath);
  }
};
const getImages = async (): Promise<string[]> => {
  try {
    //mapping through the imgs names and returning them in string array
    const arr: string[] = [];
    const files = await fs.readdir(methods.default.originPath);
    files.forEach((filename) => {
      if (filename.length) arr.push(filename.split('.')[0]);
    });
    return arr;
  } catch {
    const emptyArr: string[] = [];
    return emptyArr;
  }
};

const imageExists = async (imgName: string = ''): Promise<boolean> => {
  let img: boolean;
  switch (imgName) {
    case undefined:
      return false;
    case imgName:
      img = (await getImages()).includes(imgName);
      if (img) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
export default {
  checkThumbDir,
  thumbExists,
  imageExists,
  getImages,
  checkOriginDir
};
