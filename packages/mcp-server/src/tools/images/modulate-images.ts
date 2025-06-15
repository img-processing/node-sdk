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
  httpPath: '/v1/images/{image_id}/modulate',
  operationId: 'modulate',
};

export const tool: Tool = {
  name: 'modulate_images',
  description:
    'This endpoint allows you to adjust the brightness, saturation, and hue of an image.\n\nBrightness is one of the three properties of color, along with hue and saturation. It refers to the amount of light in an image, with a high brightness making the image lighter and a low brightness making the image darker.\n\nContrast is the difference in brightness between the lightest and darkest parts of an image. A high contrast image will have a wide range of brightness values, while a low contrast image will have a narrow range of brightness values.\n\nFinally, exposure refers to the amount of light that reaches the camera sensor when taking a photo. A high exposure value will make the image brighter, while a low exposure value will make the image darker.',
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
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.modulate(image_id, body));
};

export default { metadata, tool, handler };
