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
  httpPath: '/v1/images/{image_id}/publish',
  operationId: 'publishImage',
};

export const tool: Tool = {
  name: 'publish_images',
  description:
    'By default, all images created using the API are private and can only be accessed by the user who created them via the API key. This endpoint allows you to make a private image public, so that it can be accessed by anyone.\n\nPublishing an image adds it to a CDN, allowing it to be accessed faster and more efficiently.\n\nAfter publishing an image, the url field of the image object will be updated with the public URL. You can still access the image using the private download URL, but the public URL can be shared with others.',
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
  return asTextContentResult(await client.images.publish(image_id));
};

export default { metadata, tool, handler };
