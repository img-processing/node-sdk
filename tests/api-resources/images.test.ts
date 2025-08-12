// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import ImgProcessing, { toFile } from 'img-processing-sdk';

const client = new ImgProcessing({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource images', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.images.retrieve('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.images.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.list({ from: 'image_1234567890abcdef', take: 10 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('delete', async () => {
    const responsePromise = client.images.delete('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addWatermark: only required params', async () => {
    const responsePromise = client.images.addWatermark('image_etm0g3x5iap4cld1qcfsjvo2', {
      watermarks: [{ id: 'id' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('addWatermark: required and optional params', async () => {
    const response = await client.images.addWatermark('image_etm0g3x5iap4cld1qcfsjvo2', {
      watermarks: [{ id: 'id', height: 1, left: 0, repetition_mode: 'repeat', top: 0, width: 1 }],
      name: 'x',
    });
  });

  // Prism tests are disabled
  test.skip('blur', async () => {
    const responsePromise = client.images.blur('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('blur: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.blur(
        'image_etm0g3x5iap4cld1qcfsjvo2',
        { name: 'blurred-image', sigma: 10 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('classify', async () => {
    const responsePromise = client.images.classify('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('convert: only required params', async () => {
    const responsePromise = client.images.convert('image_etm0g3x5iap4cld1qcfsjvo2', { format: 'jpeg' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('convert: required and optional params', async () => {
    const response = await client.images.convert('image_etm0g3x5iap4cld1qcfsjvo2', {
      format: 'jpeg',
      name: 'x',
      quality: 1,
    });
  });

  // Prism tests are disabled
  test.skip('createFromURL: only required params', async () => {
    const responsePromise = client.images.createFromURL({
      name: 'example-image',
      url: 'https://example.com/image.jpg',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('createFromURL: required and optional params', async () => {
    const response = await client.images.createFromURL({
      name: 'example-image',
      url: 'https://example.com/image.jpg',
    });
  });

  // Prism tests are disabled
  test.skip('crop: only required params', async () => {
    const responsePromise = client.images.crop('image_etm0g3x5iap4cld1qcfsjvo2', {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('crop: required and optional params', async () => {
    const response = await client.images.crop('image_etm0g3x5iap4cld1qcfsjvo2', {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      name: 'x',
    });
  });

  // Prism tests are disabled
  test.skip('extractFormattedText', async () => {
    const responsePromise = client.images.extractFormattedText('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('extractFormattedText: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.extractFormattedText(
        'image_etm0g3x5iap4cld1qcfsjvo2',
        { format: 'markdown' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('imagine: only required params', async () => {
    const responsePromise = client.images.imagine({
      name: 'example-image',
      prompt: 'A beautiful sunset over the ocean.',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('imagine: required and optional params', async () => {
    const response = await client.images.imagine({
      name: 'example-image',
      prompt: 'A beautiful sunset over the ocean.',
      model: 'sdxl',
      negative_prompt: 'No people in the image.',
      seed: 42,
    });
  });

  // Prism tests are disabled
  test.skip('mirror: only required params', async () => {
    const responsePromise = client.images.mirror('image_etm0g3x5iap4cld1qcfsjvo2', { mode: 'horizontal' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('mirror: required and optional params', async () => {
    const response = await client.images.mirror('image_etm0g3x5iap4cld1qcfsjvo2', {
      mode: 'horizontal',
      name: 'x',
    });
  });

  // Prism tests are disabled
  test.skip('modulate', async () => {
    const responsePromise = client.images.modulate('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('modulate: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.modulate(
        'image_etm0g3x5iap4cld1qcfsjvo2',
        { brightness: -100, contrast: -100, exposure: -100, name: 'x', saturation: -100 },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('publish', async () => {
    const responsePromise = client.images.publish('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('removeBackground', async () => {
    const responsePromise = client.images.removeBackground('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('removeBackground: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.removeBackground(
        'image_etm0g3x5iap4cld1qcfsjvo2',
        { name: 'x' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('resize', async () => {
    const responsePromise = client.images.resize('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('resize: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.images.resize(
        'image_etm0g3x5iap4cld1qcfsjvo2',
        {
          fit: 'cover',
          height: 1,
          letterbox_color: 'letterbox_color',
          name: 'x',
          position: 'center',
          width: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(ImgProcessing.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('rotate: only required params', async () => {
    const responsePromise = client.images.rotate('image_etm0g3x5iap4cld1qcfsjvo2', { angle: 0 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('rotate: required and optional params', async () => {
    const response = await client.images.rotate('image_etm0g3x5iap4cld1qcfsjvo2', {
      angle: 0,
      name: 'x',
      unit: 'degrees',
    });
  });

  // Prism tests are disabled
  test.skip('unpublish', async () => {
    const responsePromise = client.images.unpublish('image_etm0g3x5iap4cld1qcfsjvo2');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: only required params', async () => {
    const responsePromise = client.images.upload({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
      name: 'example-image',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('upload: required and optional params', async () => {
    const response = await client.images.upload({
      image: await toFile(Buffer.from('# my file contents'), 'README.md'),
      name: 'example-image',
    });
  });

  // Prism tests are disabled
  test.skip('visualize: only required params', async () => {
    const responsePromise = client.images.visualize('image_etm0g3x5iap4cld1qcfsjvo2', {
      prompt: 'What is in this image?',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('visualize: required and optional params', async () => {
    const response = await client.images.visualize('image_etm0g3x5iap4cld1qcfsjvo2', {
      prompt: 'What is in this image?',
      model: 'uform-gen',
    });
  });
});
