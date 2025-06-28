// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/v1/images/{image_id}',
  operationId: 'deleteImage',
};

export const tool: Tool = {
  name: 'delete_images',
  description:
    'Sometimes you may need to remove an image from the system. This endpoint allows you to delete an image by its unique identifier, deleting all the data associated with the image, and making it unavailable for future requests.\n\nPublished images will no longer be accessible after deletion.',
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
  const response = await client.images.delete(image_id).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
