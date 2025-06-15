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
  httpPath: '/v1/images/{image_id}/extract-formatted-text',
  operationId: 'extractFormattedTextFromImage',
};

export const tool: Tool = {
  name: 'extract_formatted_text_images',
  description:
    'This endpoint extracts the text from an image and returns its content in the format specified in the request.\n\nThe format can be either `plain` or `markdown`. The API will return all the text from the image, trying to maintain the document structure as much as possible.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      format: {
        type: 'string',
        description:
          'The format of the extracted text. It can be markdown or plain text. If not provided, plain text will be used as default.',
        enum: ['markdown', 'plain'],
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.extractFormattedText(image_id, body));
};

export default { metadata, tool, handler };
