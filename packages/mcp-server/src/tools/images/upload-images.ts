// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/images/upload',
  operationId: 'uploadImage',
};

export const tool: Tool = {
  name: 'upload_images',
  description:
    'The first step to start processing images with the IMG Processing API is to create an Image Object. You can create an Image object by uploading an image file or by providing a URL to an existing image.\n\nThis endpoint allows you to create an Image object by uploading an image file.\n\nTo upload an image, you need to send a multipart/form-data request to the API with the image file as a File object stringified in the image field, and name field with the name of the image for identification purposes.',
  inputSchema: {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        description:
          'The image file to upload. It must be a valid image format (jpeg, png, webp) and not larger than 20MB.',
      },
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.images.upload(body));
};

export default { metadata, tool, handler };
