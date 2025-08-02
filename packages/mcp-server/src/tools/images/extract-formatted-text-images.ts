// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'img-processing-mcp/filtering';
import { Metadata, asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImgProcessing from 'img-processing-sdk';

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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint extracts the text from an image and returns its content in the format specified in the request.\n\nThe format can be either `plain` or `markdown`. The API will return all the text from the image, trying to maintain the document structure as much as possible.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'Extract Formatted Text Response',\n  description: 'Response object for extracting formatted text from an image. Contains the format and content of the extracted text.',\n  properties: {\n    content: {\n      type: 'string',\n      description: 'The content of the image processed in the desired format.'\n    },\n    format: {\n      type: 'string',\n      description: 'The format of the extracted text. It can be either plain text or markdown.',\n      enum: [        'plain',\n        'markdown'\n      ]\n    }\n  },\n  required: [    'content',\n    'format'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['image_id'],
  },
  annotations: {},
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.images.extractFormattedText(image_id, body)),
  );
};

export default { metadata, tool, handler };
