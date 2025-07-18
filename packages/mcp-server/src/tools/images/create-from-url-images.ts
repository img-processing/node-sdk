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
  httpPath: '/v1/images',
  operationId: 'createImageFromUrl',
};

export const tool: Tool = {
  name: 'create_from_url_images',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThe first step to start processing images with the IMG Processing API is to create an Image Object. You can create an Image object by uploading an image file or by providing a URL to an existing image.\n\nThis endpoint allows you to create an Image object by providing a URL to an existing image. The API will download the image from the provided URL, so make sure the URL is accessible and the image is publicly available.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/image_object',\n  $defs: {\n    image_object: {\n      type: 'object',\n      title: 'Image Object',\n      description: 'The Image object represents an image processed using the IMG Processing API. The object contains information about the image, such as its URL, size, and format. The Image object is returned in the response body of all image processing requests.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The unique identifier of the image. This identifier is used to reference the image in subsequent requests.'\n        },\n        created_at: {\n          type: 'string',\n          description: 'The date and time when the image was created. The date and time are in ISO 8601 format.',\n          format: 'date-time'\n        },\n        format: {\n          type: 'string',\n          description: 'The format of the image. The format can be one of the following: `jpeg`, `png`, `webp`',\n          enum: [            'png',\n            'jpeg',\n            'webp'\n          ]\n        },\n        height: {\n          type: 'number',\n          description: 'The height of the image in pixels.'\n        },\n        name: {\n          type: 'string',\n          description: 'The name of the image. This name is provided when uploading the image and is the way the image is identified in your account. It is not unique, in fact, each transformation you make to an image will create a new image with the same name.'\n        },\n        size: {\n          type: 'number',\n          description: 'The estimated size of the image in bytes. The size is an estimate and may not be exact since images can be compressed or optimized depending on the format and quality settings used during processing.'\n        },\n        width: {\n          type: 'number',\n          description: 'The width of the image in pixels.'\n        },\n        url: {\n          type: 'string',\n          description: 'The public URL of the image. By default, this URL is not available and will be `null`. You can make the image public by using the publish endpoint. Once the image is public, the URL will be updated with the public UR.'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'format',\n        'height',\n        'name',\n        'size',\n        'width'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the image to identify it on the dashboard',
      },
      url: {
        type: 'string',
        description:
          'The URL of the image to download. It must point to a supported image format (jpeg, png, webp).',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['name', 'url'],
  },
};

export const handler = async (client: ImgProcessing, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.images.createFromURL(body)));
};

export default { metadata, tool, handler };
