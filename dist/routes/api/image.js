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
const express = require("express");
const image = require("../../utilities/imageMethods");
const checker = require("../../utilities/imageCheck");
const images = express.Router();
images.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // Check whether request can be worked with
    const UserMsg = yield image.default.verifier(request.query);
    if (UserMsg) {
        response.send(UserMsg);
        return;
    }
    let error = '';
    // Create thumb if not yet available
    if (!(yield checker.default.thumbExists(request.query))) {
        error = yield image.default.defineThmb(request.query);
    }
    // Handle image processing error
    if (error) {
        response.send(error);
        return;
    }
    // Retrieve appropriate image genPath and display image
    const genPath = yield image.default.getImgThmb_origin(request.query);
    if (genPath) {
        response.sendFile(genPath);
    }
    else {
        response.send('something is broken please check parameters');
    }
}));
exports.default = images;
