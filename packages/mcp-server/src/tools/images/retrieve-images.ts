// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/images/{image_id}',
  operationId: 'getImage',
};

export const tool: Tool = {
  name: 'retrieve_images',
  description:
    'Sometimes you may need to retrieve a specific image information to get information about the image, such as the image URL, the image size, or the image format. This endpoint allows you to retrieve an image by its unique identifier.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.retrieve(image_id));
};

export default { metadata, tool, handler };
