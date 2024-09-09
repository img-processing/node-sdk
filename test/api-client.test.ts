import { describe, expect, test } from 'vitest';
import { IMGProcessingClient } from '../src/api-client.js';
import * as path from 'node:path';

describe('api-client tests', () => {
  const apiKey = process.env.IMG_PROCESSING_API_KEY as IMGProcessingClient.APIKey;
  if (!apiKey) {
    throw new Error('IMG_PROCESSING_API_KEY environment variable is required to run the tests');
  }

  describe('uploadImage', () => {
    test('should upload an image in the filesystem', async () => {
      const client = new IMGProcessingClient({ apiKey });
      const imagePath = path.join(__dirname, 'assets', 'test_image_1.jpeg');
      const image = await client.uploadImage({ image: imagePath, name: 'test_image' });
      console.log(image);
      expect(image).toBeDefined();
    });
  });
})