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
const index_1 = require("./routes/index");
const logger_1 = require("./utilities/logger");
const checker = require("./utilities/imageCheck");
const app = express();
const port = 5000; // starts on port 5000
//adding routing strcuture
app.use(index_1.default, logger_1.default);
//starting express server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    //path has to be defined
    yield checker.default.checkThumbDir();
    yield checker.default.checkOriginDir();
    const url = `http://localhost:${port}`;
    console.log(`open me to check Api processing project ${url}`);
}));
exports.default = app;
