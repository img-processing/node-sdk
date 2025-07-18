// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'img-processing-sdk-mcp/filtering';
import { Metadata, asTextContentResult } from 'img-processing-sdk-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImgProcessing from 'img-processing-sdk';

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
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThe classify endpoint allows you to classify an image using a pre-trained model. At the moment, the only supported model is the ResNet50 model, a deep learning model that excels at image classification tasks.\n\nThe endpoint will return a list of labels and their probabilities for the image.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  title: 'Identify Response',\n  description: 'Response object for image identification. Contains the main label and secondary labels with their scores.',\n  properties: {\n    main_label: {\n      type: 'string',\n      description: 'The main label of the image. This is the label with the highest probability.'\n    },\n    main_score: {\n      type: 'number',\n      description: 'The probability score of the main label. This is a number between 0 and 1.'\n    },\n    secondary_labels: {\n      type: 'array',\n      description: 'An array of secondary labels with their respective scores. These are the labels with lower probabilities than the main label.',\n      items: {\n        type: 'object',\n        properties: {\n          label: {\n            type: 'string',\n            description: 'The label of the secondary label. This is the label with a lower probability than the main label.'\n          },\n          score: {\n            type: 'number',\n            description: 'The probability score of the secondary label. This is a number between 0 and 1.'\n          }\n        },\n        required: [          'label',\n          'score'\n        ]\n      }\n    }\n  },\n  required: [    'main_label',\n    'main_score',\n    'secondary_labels'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
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
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.images.classify(image_id)));
};

export default { metadata, tool, handler };
