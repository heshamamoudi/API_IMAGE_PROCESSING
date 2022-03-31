import * as express from 'express';
import images from './api/image';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      `<h1>Hello to hesham amoudi api <br/>  <ul><ui><a href="/api/images?imgName=ghazal">click me to see full image :).</a></ui><br/><ui><a href="/api/images?imgName=ghazal&width=200&height=200">click me to see processed  image :). </a></ui></ul></h1>`
    );
  }
);

export default routes;
