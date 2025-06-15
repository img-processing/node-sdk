// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/images/{image_id}/crop',
  operationId: 'crop',
};

export const tool: Tool = {
  name: 'crop_images',
  description:
    'With this endpoint, you can crop an image by specifying the dimensions of the crop area.\n\nThe crop area is defined by 2 points: the top-left corner at (x1, y1) and the bottom-right corner at (x2, y2)',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      x1: {
        type: 'integer',
        description: 'The x-coordinate of the top-left corner of the crop area.',
      },
      x2: {
        type: 'integer',
        description: 'The x-coordinate of the bottom-right corner of the crop area.',
      },
      y1: {
        type: 'integer',
        description: 'The y-coordinate of the top-left corner of the crop area.',
      },
      y2: {
        type: 'integer',
        description: 'The y-coordinate of the bottom-right corner of the crop area.',
      },
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.crop(image_id, body));
};

export default { metadata, tool, handler };
