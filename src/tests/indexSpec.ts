import * as supertest from 'supertest';
import app from '../index';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as img from '../utilities/imageMethods';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/images', (): void => {
    it('trial for only with img name', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imgName=horse'
      );

      expect(response.status).toBe(200);
    });

    it('trial with img name and width and height', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imgName=horse&width=199&height=199'
      );

      expect(response.status).toBe(200);
    });

    it('fetching /api/images?imgName=horse&width=-200&height=200 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/api/images?imgName=horse&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('fwtching /api/images (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/api/images');

      expect(response.status).toBe(200);
    });
  });

  describe('fetching endpoint: /hesham', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/hesham');

      expect(response.status).toBe(404);
    });
  });
});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    img.default.thumbingPath,
    'ghazal-w200-h200.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // Promise.reject(new Error("img was not found"))
  }
});
