import { describe, expect, test } from 'vitest';
import { IMGProcessingClient } from '../src/api-client.js';
import * as path from 'node:path';
import fs from 'node:fs';
import { Blob, File } from 'node:buffer';

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
      expect(image.success).toBe(true);
      if (!image.success) {
        return;
      }
      expect(image.data).toBeDefined();
      expect(image.data.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
      expect(image.data.name).toBe('test_image');
    });

    test('should upload an image as a buffer', async () => {
      const client = new IMGProcessingClient({ apiKey });
      const imagePath = path.join(__dirname, 'assets', 'test_image_1.jpeg');
      const buffer = await fs.promises.readFile(imagePath);
      const image = await client.uploadImage({ image: buffer, name: 'test_image' });
      expect(image.success).toBe(true);
      if (!image.success) {
        return;
      }
      expect(image.data).toBeDefined();
      expect(image.data.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
      expect(image.data.name).toBe('test_image');
    });

    test('should upload an image as a blob', async () => {
      const client = new IMGProcessingClient({ apiKey });
      const imagePath = path.join(__dirname, 'assets', 'test_image_1.jpeg');
      const buffer = await fs.promises.readFile(imagePath);
      const blob = new Blob([buffer], { type: 'image/jpeg' });
      const image = await client.uploadImage({ image: blob, name: 'test_image' });
      expect(image.success).toBe(true);
      if (!image.success) {
        return;
      }
      expect(image.data).toBeDefined();
      expect(image.data.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
      expect(image.data.name).toBe('test_image');
    })

    test('should upload an image as a file', async () => {
      const client = new IMGProcessingClient({ apiKey });
      const imagePath = path.join(__dirname, 'assets', 'test_image_1.jpeg');
      const buffer = await fs.promises.readFile(imagePath);
      const file = new File([buffer], 'test_image_1.jpeg', { type: 'image/jpeg' });
      const image = await client.uploadImage({ image: file, name: 'test_image' });
      expect(image.success).toBe(true);
      if (!image.success) {
        return;
      }
      expect(image.data).toBeDefined();
      expect(image.data.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
      expect(image.data.name).toBe('test_image');
    })
  });
})