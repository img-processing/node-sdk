import { beforeAll, describe, expect, test } from 'vitest';
import { ImageObject, IMGProcessingAPIError, IMGProcessingClient } from '../../src/index.js';
import { getApiKey } from '../helpers.js';


describe('classify', () => {
  const client: IMGProcessingClient = new IMGProcessingClient({ apiKey: getApiKey() });
  let uploadedImage: ImageObject;
  beforeAll(async () => {
    const prompt = 'a cat in the snow';
    uploadedImage= await client.imagine({
      prompt,
      name: 'test_image',
      seed: 42,
    });
  })
  test('should analyze an image', async () => {
    const analysis = await uploadedImage.classify();
    expect(analysis).toBeDefined();
    expect(analysis.main_label).toMatch(/result masked/);
    expect(analysis.secondary_labels.length).toBe(4)
  })
})