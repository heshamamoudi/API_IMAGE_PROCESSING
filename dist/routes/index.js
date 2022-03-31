"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const image_1 = require("./api/image");
const routes = express.Router();
routes.use('/api/images', image_1.default);
routes.get('/', (request, response) => {
    response.send(`<h1>Hello to hesham amoudi api <br/>  <ul><ui><a href="/api/images?imgName=ghazal">click me to see full image :).</a></ui><br/><ui><a href="/api/images?imgName=ghazal&width=200&height=200">click me to see processed  image :). </a></ui></ul></h1>`);
});
exports.default = routes;
