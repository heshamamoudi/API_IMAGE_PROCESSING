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
const img = require("../utilities/imageMethods");
describe('processing images using jimp', () => {
    describe('function defineThmb tests', () => {
        it('errMsg where hight has wrong value', () => __awaiter(void 0, void 0, void 0, function* () {
            const errMsg = yield img.default.defineThmb({
                imgName: 'amoudi',
                width: '800',
                height: '-300'
            });
            expect(errMsg).toBe('Jimp failed to Create image thumb and process with the image.');
        }));
        it('errMsg where img name doesnt exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const errMsg = yield img.default.defineThmb({
                imgName: 'amoudi',
                width: '111',
                height: '222'
            });
            expect(errMsg).toBeTruthy();
        }));
        it('writing thumb image success', () => __awaiter(void 0, void 0, void 0, function* () {
            yield img.default.defineThmb({
                imgName: 'ghazal',
                height: '180',
                width: '180'
            });
            const newImg = path.resolve(img.default.thumbingPath, `ghazal-w180-h180.jpg`);
            let errMsg = '';
            try {
                yield fs_1.promises.access(newImg);
                errMsg = 'image created';
            }
            catch (_a) {
                errMsg = 'img was not created';
            }
            expect(errMsg).toEqual('image created');
        }));
    });
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const newImg = path.resolve(img.default.thumbingPath, 'horse-w199-h199.jpg');
    let errMsg;
    try {
        errMsg = yield fs_1.promises.access(newImg);
        yield fs_1.promises.unlink(newImg);
        expect(errMsg).not.toBeDefined();
    }
    catch (_a) {
        console.log(errMsg);
        expect(errMsg).not.toBeUndefined();
    }
}));
