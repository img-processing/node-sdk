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
  httpPath: '/v1/images/{image_id}/remove-background',
  operationId: 'removeBackground',
};

export const tool: Tool = {
  name: 'remove_background_images',
  description:
    'This endpoint allows you to remove the background from an image. Removing the background from an image can be useful for various purposes, such as creating a transparent background or isolating the subject of the image.\n\nThe background removal process works by segmenting the image into foreground and background regions. The API uses advanced machine learning algorithms to detect and remove the background from the image, leaving only the foreground subject.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
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
  return asTextContentResult(await client.images.removeBackground(image_id, body));
};

export default { metadata, tool, handler };
