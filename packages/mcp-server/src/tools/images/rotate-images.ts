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
  httpPath: '/v1/images/{image_id}/rotate',
  operationId: 'rotate',
};

export const tool: Tool = {
  name: 'rotate_images',
  description: 'This endpoint creates a new image by rotating the original image.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      angle: {
        type: 'number',
        description: 'The angle in degrees or radians rotate the image.',
      },
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard.',
      },
      unit: {
        type: 'string',
        description: 'The unit of the angle. Defaults to degrees if not provided.',
        enum: ['degrees', 'radians'],
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.rotate(image_id, body));
};

export default { metadata, tool, handler };
