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
  httpPath: '/v1/images/{image_id}/convert',
  operationId: 'convert',
};

export const tool: Tool = {
  name: 'convert_images',
  description:
    'With this endpoint, you can create a new image by converting an existing image to a different format.\n\nThe supported image formats are jpeg, png, and webp.\n\n- JPEG (Joint Photographic Experts Group): A commonly used method of lossy compression for digital images, particularly for those images produced by digital photography. JPEG compression significantly reduces the file size, but it can also reduce the image quality.\n- PNG (Portable Network Graphics): A raster-graphics file format that supports lossless data compression. PNG is often used for images that require transparency or when the image quality must be preserved without any loss.\n- WebP: A modern image format that provides superior lossless and lossy compression for images on the web. WebP images are smaller in size compared to JPEG and PNG, while maintaining similar or better image quality',
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
        description: 'The format to convert the image to. Supported formats are jpeg, png, webp, jpg.',
        enum: ['jpeg', 'png', 'webp', 'jpg'],
      },
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard.',
      },
      quality: {
        type: 'integer',
        description:
          'The quality of the image to convert. It is a number between 1 and 100. If not provided, a default quality will be used.',
      },
    },
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const { image_id, ...body } = args as any;
  return asTextContentResult(await client.images.convert(image_id, body));
};

export default { metadata, tool, handler };
