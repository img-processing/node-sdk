// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/images',
  operationId: 'listImages',
};

export const tool: Tool = {
  name: 'list_images',
  description:
    'This endpoint allows you to retrieve a list of all the images created by the user. The images are returned in descending order of creation date, with the most recent images first in the list.\n\nImages are paginated, following the pagination rules.',
  inputSchema: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description:
          'The image ID to start from when listing images. If provided, the list will include images created after this ID. Must be a valid image ID.',
      },
      take: {
        type: 'number',
        description: 'The number of images to return. Must be between 1 and 100. Defaults to 10.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.images.list(body));
};

export default { metadata, tool, handler };
