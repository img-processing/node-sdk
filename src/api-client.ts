import ky, { HTTPError, type KyInstance, type ResponsePromise } from 'ky';
import { ImageObject } from './image-object.js';
import * as fs from 'node:fs';
import {fileTypeFromBuffer} from 'file-type';
import { Blob, type File } from 'node:buffer';
import { IMGProcessingAPIError } from './api-error.js';

export class IMGProcessingClient {
  protected readonly client: KyInstance;

  constructor({apiKey}: IMGProcessingClient.ClientOptions) {
    this.client = ky.create({
      prefixUrl: 'https://api.img-processing.com/',
      headers: {
        'x-api-key': apiKey,
      }
    });
  }

  protected async request<T>(call: () => ResponsePromise<T>): Promise<T> {
    try {
      const response = await call();
      return await response.json();
    } catch (error) {
      if (error instanceof HTTPError) {
        throw new IMGProcessingAPIError(await error.response.json());
      }
      console.error(error);
      throw new Error('An unexpected error occurred. Create an issue: https://github.com/img-processing/node-sdk/issues');
    }
  }

  protected async imageRequest(call: () => ResponsePromise<ImageObject>): Promise<ImageObject> {
    const response = await this.request(call);
    return new ImageObject({ image: response, client: this });
  }


  async uploadImage({ image, name }: IMGProcessingClient.uploadImage.Options): Promise<ImageObject> {
    const formData = new FormData();
    formData.append('name', name);

    if (typeof image === 'string') {
      // The image is a file in the file system
      const imageFile = await fs.promises.readFile(image);
      const mimeType = (await fileTypeFromBuffer(imageFile))?.mime;
      formData.append('image', new Blob([imageFile], {
        type: mimeType
      }));
    } else if (image instanceof Buffer) {
      const mimeType = (await fileTypeFromBuffer(image))?.mime;
      formData.append('image', new Blob([image], {
        type: mimeType
      }));
    } else {
      formData.append('image', image);
    }

    return this.imageRequest(() => this.client.post('v1/images/upload', {
      body: formData,
      headers: {
      }
    }));
  }

  async createImageFromUrl({ url, name }: IMGProcessingClient.createImageFromUrl.Options): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>('v1/images', {
      json: {
        url,
        name
      }
    }));
  }

  /**
   * Creates a new image by resizing an existing image.
   *
   * At the moment, there are three fit modes available:
   * - `fill`: The image is resized to fill the specified dimensions, stretching/squishing the image to fit the provided dimensions.
   * This is the default fit mode.
   * - `contain`: The image is resized to fit within the specified dimensions, maintaining the aspect ratio, and adding
   * a letterbox if necessary.
   * - `cover`: The image is resized to cover the specified dimensions, maintaining the aspect ratio, cropping/clipping
   * the image if necessary.
   *
   * Additionally, you can specify the background color for the letterbox when using the `contain` fit mode, and
   * the gravity for cropping or positioning the image when using the `cover` and `contain` fit modes.
   */
  async resizeImage({ imageId, width, height, fit }: IMGProcessingClient.resizeImage.Options): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>(`v1/images/${imageId}/resize`, {
      json: {
        width,
        height,
        fit
      }
    }));
  }
}

export declare namespace IMGProcessingClient {
  export type APIKey = `live_${string}` | `test_${string}`;

  export type ClientOptions = {
    apiKey: APIKey;
  }

  export type SuccessResponse<T> = {
    success: true;
    data: T;
  }

  export type Error = {
    type: string;
    error: string;
    status: number;
    message?: string;
    errors?: string[];
  }

  export type ErrorResponse = {
    success: false;
    error: Error;
  }

  export namespace uploadImage {
    type FilePath = string;
    export type Options = {
      image: Blob | File | FilePath | Buffer;
      name: string;
    }
  }

  export namespace createImageFromUrl {
    export type Options = {
      url: string;
      name: string;
    }
  }

  export namespace resizeImage {
    export type Options = {
      /** The ID of the image to resize. */
      imageId: string;
      /** The desired width of the resized image in pixels. */
      width: number;
      /** The desired height of the resized image in pixels. */
      height: number;
      /**
       * The method used to resize the image.
       * At the moment, there are three fit modes available:
       * - `fill`: This mode will resize the image to the exact width and height specified. The image will be stretched to fit the dimensions.
       * - `contain`: This mode will resize the image to fit within the specified width and height. The image will not be stretched.
       * - `cover`: This mode will resize the image to cover the specified width and height. The image will be stretched to fit the dimensions.
       * */
      fit?: 'fill' | 'contain' | 'cover';
      /** The color of the letterbox when using the `contain` fit mode.
       It can be a color name, a hex color code, or `transparent`. */
      letterbox_color?: string;
      /** The position of the image when using the `cover` or `contain` fit modes. */
      position?: 'center' | 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    }
  }
}
