// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asBinaryContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/images/{image_id}/download',
  operationId: 'downloadImage',
};

export const tool: Tool = {
  name: 'download_images',
  description:
    'This endpoint allows you to download an image by its unique identifier. The image is returned as a binary response.\n\nThis request is authenticated, so it is not recommended to share this URL with others. Use this endpoint to download images in your application or service, and serve them to your users, or use the publish endpoint to generate a public link to share the image with others.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
    },
    required: ['image_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asBinaryContentResult(await client.images.download(image_id));
};

export default { metadata, tool, handler };
