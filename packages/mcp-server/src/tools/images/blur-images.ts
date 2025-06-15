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
  httpPath: '/v1/images/{image_id}/blur',
  operationId: 'blur',
};

export const tool: Tool = {
  name: 'blur_images',
  description:
    'This endpoint allows you to apply a blur effect to an image. Blurring an image can be useful for various purposes, such as anonymizing sensitive information, creating a soft-focus effect, loader skeletons, etc.\n\nBlurring an image depends on a factor sigma that determines the intensity of the blur effect. The higher the value of sigma, the more intense the blur effect will be. This value represents the standard deviation of the Gaussian kernel used to apply the blur effect.',
  inputSchema: {
    type: 'object',
    properties: {
      image_id: {
        type: 'string',
        description:
          'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.',
      },
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard.',
      },
      sigma: {
        type: 'number',
        description: 'The standard deviation of the Gaussian kernel used to apply the blur effect.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.blur(image_id, body));
};

export default { metadata, tool, handler };
