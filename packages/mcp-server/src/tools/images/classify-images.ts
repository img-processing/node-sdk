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
  httpPath: '/v1/images/{image_id}/classify',
  operationId: 'classifyImage',
};

export const tool: Tool = {
  name: 'classify_images',
  description:
    'The classify endpoint allows you to classify an image using a pre-trained model. At the moment, the only supported model is the ResNet50 model, a deep learning model that excels at image classification tasks.\n\nThe endpoint will return a list of labels and their probabilities for the image.',
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
  return asTextContentResult(await client.images.classify(image_id));
};

export default { metadata, tool, handler };
