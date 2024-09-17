import { beforeAll, describe, expect, test } from 'vitest';
import { ImageObject, IMGProcessingClient } from '../../src/index.js';
import { getApiKey } from '../helpers.js';

describe('modulate', () => {
  const client: IMGProcessingClient = new IMGProcessingClient({ apiKey: getApiKey() });
  let uploadedImage: ImageObject;

  beforeAll(async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    uploadedImage = await client.createImageFromUrl({ url, name: "test_image" });
  })

  test('should modulate an image', async () => {
    const modulatedImage = await uploadedImage.modulate({
      brightness: 0.5,
      saturation: 0.5,
      hue: 120,
    });
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
  })

  test('should throw validation error if hue is not an integer', async () => {
    await expect(() => uploadedImage.modulate({
      brightness: 0.5,
      saturation: 0.5,
      hue: 120.5,
    })).rejects.toThrow();
  })
})