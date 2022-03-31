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
const supertest = require("supertest");
const index_1 = require("../index");
const fs_1 = require("fs");
const path = require("path");
const img = require("../utilities/imageMethods");
const request = supertest(index_1.default);
describe('Test responses from endpoints', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /api/images', () => {
        it('trial for only with img name', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?imgName=horse');
            expect(response.status).toBe(200);
        }));
        it('trial with img name and width and height', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?imgName=horse&width=199&height=199');
            expect(response.status).toBe(200);
        }));
        it('fetching /api/images?imgName=horse&width=-200&height=200 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?imgName=horse&width=-200&height=200');
            expect(response.status).toBe(200);
        }));
        it('fwtching /api/images (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images');
            expect(response.status).toBe(200);
        }));
    });
    describe('fetching endpoint: /hesham', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/hesham');
            expect(response.status).toBe(404);
        }));
    });
});
// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resizedImagePath = path.resolve(img.default.thumbingPath, 'ghazal-w200-h200.jpg');
    try {
        yield fs_1.promises.access(resizedImagePath);
        fs_1.promises.unlink(resizedImagePath);
    }
    catch (_a) {
        // Promise.reject(new Error("img was not found"))
    }
}));
