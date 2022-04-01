"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
const Sharp = require("sharp");
const checks = require("./imageCheck");
// creating origin path and thumb path
const originPath = path.resolve(`${__dirname}`, '../../images/full');
const thumbingPath = path.resolve(`${__dirname}`, '../../images/thumb');
const getImgThmb_origin = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    let imgPath;
    switch (fields.imgName) {
        case undefined:
            return undefined;
        case fields.imgName:
            // creating path
            imgPath =
                fields.width && fields.height
                    ? path.resolve(thumbingPath, `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`)
                    : path.resolve(originPath, `${fields.imgName}.jpg`);
            // verify image exists
            try {
                yield fs_1.promises.access(imgPath);
                return imgPath;
            }
            catch (_a) {
                return undefined;
            }
        default:
            return undefined;
    }
});
//jimp processing
const sharp_processing = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Sharp(fields.src).resize(fields.w, fields.h).toFormat('jpg').toFile(fields.tg);
        return;
    }
    catch (_b) {
        return 'Jimp failed to Create image thumb and process with the image.';
    }
});
const defineThmb = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    let originPath1;
    let pathtothumb;
    let w;
    let h;
    switch (true) {
        case fields.imgName === undefined ||
            fields.width === undefined ||
            fields.height === undefined:
            return undefined;
        case fields.width !== undefined && fields.height !== undefined:
            originPath1 = path.resolve(`${originPath}`, `${fields.imgName}.jpg`);
            pathtothumb = path.resolve(`${thumbingPath}`, `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`);
            w = parseInt(fields.width || "");
            h = parseInt(fields.width || "");
            if (!isNaN(w) || w + '' !== '' && !isNaN(h) || h + '' !== '')
                return yield sharp_processing({
                    src: originPath1,
                    tg: pathtothumb,
                    w: parseInt(w + ""),
                    h: parseInt(h + "")
                });
        default:
            throw Error('Please check administrator something went wrong');
    }
    if (fields.imgName === undefined ||
        fields.width === undefined ||
        fields.height === undefined) {
        return undefined; // if either of them is undefined it will return undefined
    }
    // modify image and save it as a thumb
});
//class ends
const verifier = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    let existingImages;
    let h;
    let w;
    switch (true) {
        case !(yield checks.default.imageExists(fields.imgName)):
            console.log('case verifier 1');
            existingImages = (yield checks.default.getImages()).join(', ');
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
            switch (true) {
                case (Number.isNaN(w) ||
                    (w < 1 && Number.isNaN(h)) ||
                    h < 1):
                    return "Please insert  a positive numbers  for the 'width/height' which is higher than 0.";
            }
            break;
        default:
            return undefined;
    }
});
exports.default = {
    getImgThmb_origin,
    defineThmb,
    sharp_processing,
    originPath,
    thumbingPath,
    verifier
};
