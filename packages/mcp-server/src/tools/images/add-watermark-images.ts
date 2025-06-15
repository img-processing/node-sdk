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
  httpPath: '/v1/images/{image_id}/watermark',
  operationId: 'watermark',
};

export const tool: Tool = {
  name: 'add_watermark_images',
  description:
    'This endpoint allows you to add watermarks to an image. Watermarks are a great way to protect your images from unauthorized use and to promote your brand.\n\nAt the moment, you can only add image watermarks to your images. You must upload your watermark, apply the transformations, and once you have the desired watermark, apply it to your images using this endpoint.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      watermarks: {
        type: 'array',
        description: 'An array of watermark objects to apply to the image',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The ID of the image to use as a watermark. Must be a valid image ID.',
            },
            height: {
              type: 'integer',
              description:
                'The height of the watermark in pixels. If not provided, the watermark will be applied at its original height.',
            },
            left: {
              type: 'integer',
              description:
                'The position of the watermark from the left of the image to apply the watermark. If not provided, the watermark will be applied at the left of the image.',
            },
            repetition_mode: {
              type: 'string',
              description:
                'The repetition mode of the watermark. If not provided, the watermark will be applied once',
              enum: ['repeat', 'no_repeat', 'repeat_x', 'repeat_y'],
            },
            top: {
              type: 'integer',
              description:
                'The position of the watermark from the top of the image to apply the watermark. If not provided, the watermark will be applied at the top of the image.',
            },
            width: {
              type: 'integer',
              description:
                'The width of the watermark in pixels. If not provided, the watermark will be applied at its original width.',
            },
          },
          required: ['id'],
        },
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
  return asTextContentResult(await client.images.addWatermark(image_id, body));
};

export default { metadata, tool, handler };
