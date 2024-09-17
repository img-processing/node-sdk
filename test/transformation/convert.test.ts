import { beforeAll, describe, expect, test } from 'vitest';
import { ImageObject, IMGProcessingClient } from '../../src/index.js';
import { getApiKey } from '../helpers.js';

describe('convert', () => {
  const client: IMGProcessingClient = new IMGProcessingClient({ apiKey: getApiKey() });
  let uploadedImage: ImageObject;

  beforeAll(async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    uploadedImage = await client.createImageFromUrl({ url, name: "test_image" });
  })

  test('should convert the image to png', async () => {
    const modulatedImage = await uploadedImage.convert({
      format: "png"
    });
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
  })

  test('should throw error if quality is greater than 100', async () => {
    await expect(() => uploadedImage.convert({
      format: "jpeg",
      quality: 101
    })).rejects.toThrow();
  })
})