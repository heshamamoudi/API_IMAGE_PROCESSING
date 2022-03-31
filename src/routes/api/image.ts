import * as express from 'express';
import * as image from '../../utilities/imageMethods';
import * as checker from '../../utilities/imageCheck';

const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    // Check whether request can be worked with
    const UserMsg: undefined | string = await image.default.verifier(
      request.query
    );
    if (UserMsg) {
      response.send(UserMsg);
      return;
    }

    let error: undefined | string = '';

    // Create thumb if not yet available
    if (!(await checker.default.thumbExists(request.query))) {
      error = await image.default.defineThmb(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // Retrieve appropriate image genPath and display image
    const genPath: undefined | string = await image.default.getImgThmb_origin(
      request.query
    );
    if (genPath) {
      response.sendFile(genPath);
    } else {
      response.send('something is broken please check parameters');
    }
  }
);

export default images;
