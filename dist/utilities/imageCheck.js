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
const methods = require("./imageMethods");
const thumbExists = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    let imgPath;
    switch (true) {
        case fields.imgName === undefined ||
            fields.width === undefined ||
            fields.height === undefined:
            return false;
        case fields:
            //joining img bath with thumb path
            imgPath = path.resolve(methods.default.thumbingPath, `${fields.imgName}-w${fields.width}-h${fields.height}.jpg`);
            try {
                yield fs_1.promises.access(imgPath);
                return true;
            }
            catch (_a) {
                return false;
            }
        default:
            return false;
    }
});
/**
 * checking if directory exists if not create it
 */
const checkThumbDir = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(methods.default.thumbingPath);
        // directory exists
    }
    catch (_b) {
        //creating directory
        fs_1.promises.mkdir(methods.default.thumbingPath);
    }
});
const checkOriginDir = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(methods.default.originPath);
        // directory exists
    }
    catch (_c) {
        //creating directory
        fs_1.promises.mkdir(methods.default.originPath);
    }
});
const getImages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //mapping through the imgs names and returning them in string array
        const arr = [];
        const files = yield fs_1.promises.readdir(methods.default.originPath);
        files.forEach((filename) => {
            if (filename.length)
                arr.push(filename.split('.')[0]);
        });
        return arr;
    }
    catch (_d) {
        const emptyArr = [];
        return emptyArr;
    }
});
const imageExists = (imgName = '') => __awaiter(void 0, void 0, void 0, function* () {
    let img;
    switch (imgName) {
        case undefined:
            return false;
        case imgName:
            img = (yield getImages()).includes(imgName);
            if (img) {
                return true;
            }
            return false;
        default:
            return false;
    }
});
exports.default = {
    checkThumbDir,
    thumbExists,
    imageExists,
    getImages,
    checkOriginDir
};
