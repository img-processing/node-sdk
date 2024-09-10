import { describe, expect, test } from 'vitest';
import { IMGProcessingClient } from '../src/api-client.js';

describe('createImageFromUrl', () => {
  const apiKey = process.env.IMG_PROCESSING_API_KEY as IMGProcessingClient.APIKey;
  if (!apiKey) {
    throw new Error('IMG_PROCESSING_API_KEY environment variable is required to run the tests');
  }
  test('should create an image from a URL', async () => {
    const client = new IMGProcessingClient({ apiKey });
    const url = 'https://storage.img-processing.com/og-image.jpg';
    const image = await client.createImageFromUrl({ url, name: 'test_image' });
    console.log(image);
    expect(image.success).toBe(true);
    if (!image.success) {
      return;
    }
    expect(image.data).toBeDefined();
    expect(image.data.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.data.name).toBe('test_image');
  })

  test('should throw error if no name is provided', async () => {
    const client = new IMGProcessingClient({ apiKey });
    const url = 'https://storage.img-processing.com/og-image.jpg';
    const result = await client.createImageFromUrl({ url, name: undefined as any });
    expect(result.success).toBe(false);
    if (result.success) {
      return;
    }
    expect(result.error.type).toBe('https://docs.img-processing.com/errors/validation-error');
    expect(result.error.error).toBe('Validation Error');
  })
})
