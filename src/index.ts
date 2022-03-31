import * as express from 'express';
import routes from './routes/index';
import logger from './utilities/logger';
import * as checker from './utilities/imageCheck';

const app = express();
const port = 5000; // starts on port 5000

//adding routing strcuture
app.use(routes, logger);

//starting express server
app.listen(port, async (): Promise<void> => {
  //path has to be defined
  await checker.default.checkThumbDir();
  await checker.default.checkOriginDir();

  const url: string = `http://localhost:${port}`;
  console.log(`open me to check Api processing project ${url}`);
});

export default app;
