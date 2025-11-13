// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'img-processing-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'img-processing-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import ImgProcessing from 'img-processing-sdk';

export const metadata: Metadata = {
  resource: 'images',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/images/{image_id}/modulate',
  operationId: 'modulate',
};

export const tool: Tool = {
  name: 'modulate_images',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint allows you to adjust the brightness, saturation, and hue of an image.\n\nBrightness is one of the three properties of color, along with hue and saturation. It refers to the amount of light in an image, with a high brightness making the image lighter and a low brightness making the image darker.\n\nContrast is the difference in brightness between the lightest and darkest parts of an image. A high contrast image will have a wide range of brightness values, while a low contrast image will have a narrow range of brightness values.\n\nFinally, exposure refers to the amount of light that reaches the camera sensor when taking a photo. A high exposure value will make the image brighter, while a low exposure value will make the image darker.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/image_object',\n  $defs: {\n    image_object: {\n      type: 'object',\n      title: 'Image Object',\n      description: 'The Image object represents an image processed using the IMG Processing API. The object contains information about the image, such as its URL, size, and format. The Image object is returned in the response body of all image processing requests.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The date and time when the image was created. The date and time are in ISO 8601 format.',\n          format: 'date-time'\n        },\n        format: {\n          type: 'string',\n          description: 'The format of the image. The format can be one of the following: `jpeg`, `png`, `webp`',\n          enum: [            'png',\n            'jpeg',\n            'webp'\n          ]\n        },\n        height: {\n          type: 'number',\n          description: 'The height of the image in pixels.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the image. This name is provided when uploading the image and is the way the image is identified in your account. It is not unique, in fact, each transformation you make to an image will create a new image with the same name.'\n        },\n        size: {\n          type: 'number',\n          description: 'The estimated size of the image in bytes. The size is an estimate and may not be exact since images can be compressed or optimized depending on the format and quality settings used during processing.'\n        },\n        width: {\n          type: 'number',\n          description: 'The width of the image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'The public URL of the image. By default, this URL is not available and will be `null`. You can make the image public by using the publish endpoint. Once the image is public, the URL will be updated with the public UR.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'format',\n        'height',\n        'name',\n        'size',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      brightness: {
        type: 'number',
        description:
          'The brightness level to apply to the image. The difference between the brightness and lightness parameters is that brightness multiplies the color values, while lightness adds a constant value to the color values. Value should be between -100 and 100, where 0 is no change.',
      },
      contrast: {
        type: 'number',
      },
      exposure: {
        type: 'number',
        description: 'The exposure multiplier to apply to the image.',
      },
      name: {
        type: 'string',
        description: 'The name of the modulation. This is used to identify the modulation in the dashboard.',
      },
      saturation: {
        type: 'number',
        description: 'The saturation multiplier to apply to the image.',
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.images.modulate(image_id, body)));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
