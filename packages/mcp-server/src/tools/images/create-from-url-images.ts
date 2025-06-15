// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/images',
  operationId: 'createImageFromUrl',
};

export const tool: Tool = {
  name: 'create_from_url_images',
  description:
    'The first step to start processing images with the IMG Processing API is to create an Image Object. You can create an Image object by uploading an image file or by providing a URL to an existing image.\n\nThis endpoint allows you to create an Image object by providing a URL to an existing image. The API will download the image from the provided URL, so make sure the URL is accessible and the image is publicly available.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard',
      },
      url: {
        type: 'string',
        description:
          'The URL of the image to download. It must point to a supported image format (jpeg, png, webp).',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.images.createFromURL(body));
};

export default { metadata, tool, handler };
