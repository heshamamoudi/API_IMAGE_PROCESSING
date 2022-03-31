import { promises as fs } from 'fs';
import * as path from 'path';
import * as Jimp from 'jimp';
import * as checks from './imageCheck';

// interface for the jimp ... less errors and mistakes
interface resizer_jimp {
  src: string;
  tg: string;
  w: number;
  h: number;
}
// image interface to make it easier and with less errors
interface imageInterface {
  imgName?: string;
  width?: string;
  height?: string;
}

// creating origin path and thumb path
const originPath = path.resolve(`${__dirname}`, '../images/full');
const thumbingPath = path.resolve(`${__dirname}`, '../images/thumb');

const getImgThmb_origin = async (
  fields: imageInterface
): Promise<string | undefined> => {
  let imgPath: string;
  switch (fields.imgName) {
    case undefined:
      return undefined;
    case fields.imgName:
      // creating path
      imgPath =
        fields.width && fields.height
          ? path.resolve(
              thumbingPath,
              `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`
            )
          : path.resolve(originPath, `${fields.imgName}.jpg`);

      // verify image exists
      try {
        await fs.access(imgPath);
        return imgPath;
      } catch {
        return undefined;
      }

    default:
      return undefined;
  }
};

//jimp processing
const jimp_process = async (
  fields: resizer_jimp
): Promise<undefined | string> => {
  try {
    const img = (await Jimp.read(fields.src)).resize(fields.w, fields.h);
    await img.writeAsync(fields.tg);
    return;
  } catch {
    return 'Jimp failed to Create image thumb and process with the image.';
  }
};

const defineThmb = async (
  fields: imageInterface
): Promise<undefined | string> => {
  let originPath1: string;
  let pathtothumb: string;
  let w: string;
  let h: string;
  switch (true) {
    case fields.imgName === undefined ||
      fields.width === undefined ||
      fields.height === undefined:
      return undefined;

    case fields.width !== undefined && fields.height !== undefined:
      originPath1 = path.resolve(`${originPath}`, `${fields.imgName}.jpg`);
      pathtothumb = path.resolve(
        `${thumbingPath}`,
        `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`
      );
      w = fields.width as string;
      h = fields.height as string;

      return await jimp_process({
        src: originPath1,
        tg: pathtothumb,
        w: parseInt(w),
        h: parseInt(h)
      });

    default:
      throw Error('Please check administrator something went wrong');
  }

  if (
    fields.imgName === undefined ||
    fields.width === undefined ||
    fields.height === undefined
  ) {
    return undefined; // if either of them is undefined it will return undefined
  }

  // modify image and save it as a thumb
};
//class ends
const verifier = async (fields: imageInterface): Promise<undefined | string> => {
  let existingImages: undefined | string;
  let h: number;
  let w: number;
  switch (true) {
    case !(await checks.default.imageExists(fields.imgName)):
      console.log('case verifier 1');
      existingImages = (await checks.default.getImages()).join(', ');
      if (existingImages.length > 0)
        return `choose an image name and insert it in field: 'imgName=' from those available imgs: ${existingImages}.`;

      break;
    case fields.width === undefined && fields.height === undefined:
      console.log('case verifier 2');
      return undefined; // undefined values

    case fields.width !== undefined && fields.height !== undefined:
      console.log('case verifier 3');
      // checking for valid width & height value
      w = parseInt(fields.width || '');
      h = parseInt(fields.height || '');
      
      switch (true){
        case (Number.isNaN(w) ||
        (w < 1 && Number.isNaN(h)) ||
        h < 1
      ):
      return "Please insert  a positive numbers  for the 'width/height' which is higher than 0.";
      }
      break;

    default:
      return undefined;
  }
};

export default {
  getImgThmb_origin,
  defineThmb,
  jimp_process,
  originPath,
  thumbingPath,
  verifier
};
