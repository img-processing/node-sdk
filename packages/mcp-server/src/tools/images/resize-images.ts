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
  httpPath: '/v1/images/{image_id}/resize',
  operationId: 'resize',
};

export const tool: Tool = {
  name: 'resize_images',
  description:
    'This endpoint creates a new image by resizing an existing image.\n\nAt the moment, there are three fit modes available:\n\nFit Modes\nAvailable fit modes\n\n- fill: The image is resized to fill the specified dimensions, stretching/squishing the image to fit the provided dimensions. This is the default fit mode.\n- contain: The image is resized to fit within the specified dimensions, maintaining the aspect ratio, and adding a letterbox if necessary.\n- cover: The image is resized to cover the specified dimensions, maintaining the aspect ratio, cropping/clipping the image if necessary.\nAdditionally, you can specify the background color for the letterbox when using the contain fit mode, and the gravity for cropping or positioning the image when using the cover and contain fit modes.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      fit: {
        type: 'string',
        description: 'The fit mode to use when resizing the image.',
        enum: ['cover', 'contain', 'fill'],
      },
      height: {
        type: 'integer',
        description:
          'The height of the image to resize. It must be an integer greater than 0 and less than 10000. If not provided, the resized image will keep the aspect ratio of the original image.',
      },
      letterbox_color: {
        type: 'string',
        description:
          'The color of the letterbox when using the contain fit mode. It can be a color name, a hex color code, or transparent.',
      },
      name: {
        type: 'string',
        description: 'The name of the resized image. It is used to identify the image on the dashboard.',
      },
      position: {
        type: 'string',
        description: 'The gravity position of the image when using the cover or contain fit modes.',
        enum: [
          'center',
          'top',
          'right',
          'bottom',
          'left',
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ],
      },
      width: {
        type: 'integer',
        description:
          'The width of the image to resize. It must be an integer greater than 0 and less than 10000. If not provided, the resized image will keep the aspect ratio of the original image.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.resize(image_id, body));
};

export default { metadata, tool, handler };
