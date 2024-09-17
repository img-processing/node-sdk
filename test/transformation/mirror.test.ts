import { beforeAll, describe, expect, test } from 'vitest';
import { ImageObject, IMGProcessingClient } from '../../src/index.js';
import { getApiKey } from '../helpers.js';

describe('mirror', () => {
  const client: IMGProcessingClient = new IMGProcessingClient({ apiKey: getApiKey() });
  let uploadedImage: ImageObject;

  beforeAll(async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    uploadedImage = await client.createImageFromUrl({ url, name: "test_image" });
  })

  test('should mirror the image', async () => {
    const modulatedImage = await uploadedImage.mirror({
      mode: "horizontal",
    });
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
  })
})