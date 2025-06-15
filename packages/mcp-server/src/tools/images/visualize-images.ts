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
  httpPath: '/v1/images/{image_id}/visualize',
  operationId: 'visualizeImage',
};

export const tool: Tool = {
  name: 'visualize_images',
  description:
    'This endpoint returns a response based on the content of an image and a base prompt.\n\nThe prompt can be a question, statement, or any text that you want to ask about the image. The API will analyze the content of the image and generate a response based on the prompt using a pre-trained model.\n\nRight now there are three models available for this endpoint:\n\n- Uform-Gen: UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering.\n- Llava: LLaVA is a large multimodal model that can generate text based on images and text prompts.\n- Gemini: Gemini is a multimodal model with advanced capabilities for understanding and generating text based on images.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      prompt: {
        type: 'string',
        description:
          'The prompt to answer based on the content of the image. This is a natural language question or instruction that the model will respond to.',
      },
      model: {
        type: 'string',
        description:
          'The model to use for the visualization. Supported models are uform-gen, llava, and gemini. If not provided, the default model will be used.',
        enum: ['uform-gen', 'llava', 'gemini'],
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.visualize(image_id, body));
};

export default { metadata, tool, handler };
