import { beforeAll, describe, expect, test } from 'vitest';
import { ImageObject, IMGProcessingClient } from '../../src/index.js';
import { getApiKey } from '../helpers.js';

describe('removeBackground', () => {
  const client: IMGProcessingClient = new IMGProcessingClient({ apiKey: getApiKey() });
  let uploadedImage: ImageObject;

  beforeAll(async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    uploadedImage = await client.createImageFromUrl({ url, name: "test_image" });
  })

  test('should remove the image background', async () => {
    const modulatedImage = await uploadedImage.removeBackground();
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
    expect(modulatedImage.format).toBe("png");
  }, 20_000)
})