// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'img-processing-sdk-mcp/filtering';
import { asTextContentResult } from 'img-processing-sdk-mcp/tools/types';

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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint returns a response based on the content of an image and a base prompt.\n\nThe prompt can be a question, statement, or any text that you want to ask about the image. The API will analyze the content of the image and generate a response based on the prompt using a pre-trained model.\n\nRight now there are three models available for this endpoint:\n\n- Uform-Gen: UForm-Gen is a small generative vision-language model primarily designed for Image Captioning and Visual Question Answering.\n- Llava: LLaVA is a large multimodal model that can generate text based on images and text prompts.\n- Gemini: Gemini is a multimodal model with advanced capabilities for understanding and generating text based on images.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'Visualize Response',\n  description: 'Response object for the visualize endpoint.',\n  properties: {\n    response: {\n      type: 'string',\n      description: 'The response from the AI model. This is the description of the image based on the prompt provided.'\n    }\n  },\n  required: [    'response'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.images.visualize(image_id, body)));
};

export default { metadata, tool, handler };
