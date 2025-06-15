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
  httpPath: '/v1/images/{image_id}/unpublish',
  operationId: 'unpublishImage',
};

export const tool: Tool = {
  name: 'unpublish_images',
  description:
    'With this endpoint, you can unpublish an image that was previously published using the Publish Image endpoint. This will remove the image from the CDN and make it private again.\n\nAfter unpublishing an image, the url field of the image object will be updated with to null. You can still download the image using the Download Image endpoint.',
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
  return asTextContentResult(await client.images.unpublish(image_id));
};

export default { metadata, tool, handler };
