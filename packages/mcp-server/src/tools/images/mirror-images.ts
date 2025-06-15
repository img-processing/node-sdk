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
  httpPath: '/v1/images/{image_id}/mirror',
  operationId: 'mirror',
};

export const tool: Tool = {
  name: 'mirror_images',
  description:
    'With this endpoint, you can mirror an existing image horizontally or vertically to create a new image.\n\nMirror an image horizontally means that the image is mirrored along the vertical axis, while flipping an image vertically means that the image is mirrored along the horizontal axis. You can also mirror an image horizontally and vertically at the same time using the mode both',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      mode: {
        type: 'string',
        description: 'The mode of mirroring. It can be horizontal, vertical, or both.',
        enum: ['horizontal', 'vertical', 'both'],
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
  return asTextContentResult(await client.images.mirror(image_id, body));
};

export default { metadata, tool, handler };
