"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const image_1 = require("./api/image");
const routes = express.Router();
routes.use('/api/images', image_1.default);
routes.get('/', (request, response) => {
    response.send(`<h1>Hello to hesham amoudi api <br/>  <ul><ui><a href="/api/images?imgName=ghazal">click me to see full image :).</a></ui><br/><ui><a href="/api/images?imgName=ghazal&width=200&height=200">click me to see processed  image :). </a></ui></ul> <br/>how to use Ex (note: keep in mind hight and width cannot be below 1 ):<br/> images names:<br/> horse <br/> ghazal <br/> holagram <br/> horse2  <br/>http://localhost:5000/api/images?imgName=horse&width=888&height=999 <br/> http://localhost:5000/api/images?imgName=horse2&width=300&height=300 </h1>`);
});
exports.default = routes;
