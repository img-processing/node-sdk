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

  protected async imageRequest<Format extends ImageObject.SupportedFormat = ImageObject.SupportedFormat>(call: () => ResponsePromise<ImageObject>): Promise<ImageObject<Format>> {
    const response = await this.request(call);
    return new ImageObject({ image: response, client: this }) as ImageObject<Format>;
  }


  async uploadImage({ image, name }: IMGProcessingClient.uploadImage.Params): Promise<ImageObject> {
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

  async createImageFromUrl({ url, name }: IMGProcessingClient.createImageFromUrl.Params): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>('v1/images', {
      json: {
        url,
        name
      }
    }));
  }

  /**
   * Create a new image by converting an existing image to a different format.
   *
   * The supported image formats are `jpeg`, `png`, and `webp`.
   *
   * - **JPEG (Joint Photographic Experts Group):** A commonly used method of lossy compression for digital images,
   * particularly for those images produced by digital photography. JPEG compression significantly reduces the file size, but it can also reduce the image quality.
   * - **PNG (Portable Network Graphics):** A raster-graphics file format that supports lossless data compression.
   * PNG is often used for images that require transparency or when the image quality must be preserved without any loss.
   * - **WebP:** A modern image format that provides superior lossless and lossy compression for images on the web.
   * WebP images are smaller compared to JPEG and PNG, while maintaining similar or better image quality.
   */
  async convert<Format extends ImageObject.SupportedFormat>({ imageId, format, name }: IMGProcessingClient.convert.Params<Format>): Promise<ImageObject<Format>> {
    return this.imageRequest(() => this.client.post<ImageObject<Format>>(`v1/images/${imageId}/convert`, {
      json: {
        format,
        name
      }
    }));
  }

  /**
   * Crop an image by specifying the dimensions of the crop area.
   *
   * The crop area is defined by 2 points: the top-left corner at `(x1, y1)` and the bottom-right corner at `(x2, y2)`.
   */
  async crop({ imageId, x1, y1, x2, y2, name }: IMGProcessingClient.crop.Params): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>(`v1/images/${imageId}/crop`, {
      json: {
        x1,
        y1,
        x2,
        y2,
        name
      }
    }));
  }

  /**
   * Mirror an existing image horizontally or vertically to create a new image.
   *
   * Mirror an image horizontally means that the image is mirrored along the vertical axis, while flipping an
   * image vertically means that the image is mirrored along the horizontal axis. You can also mirror an image
   * horizontally and vertically at the same time using the mode `both`.
   */
  async mirror({ imageId, mode, name }: IMGProcessingClient.mirror.Params): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>(`v1/images/${imageId}/mirror`, {
      json: {
        mode,
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
  async resize({ imageId, width, height, fit, name, position }: IMGProcessingClient.resize.Params): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>(`v1/images/${imageId}/resize`, {
      json: {
        width,
        height,
        fit,
        name,
        position
      }
    }));
  }

  /**
   * Rotate an existing image by a specified angle.
   */
  async rotate({ imageId, angle, unit, name }: IMGProcessingClient.rotate.Params): Promise<ImageObject> {
    return this.imageRequest(() => this.client.post<ImageObject>(`v1/images/${imageId}/rotate`, {
      json: {
        angle,
        unit,
        name
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
    export type Params = {
      image: Blob | File | FilePath | Buffer;
      name: string;
    }
  }

  export namespace createImageFromUrl {
    export type Params = {
      url: string;
      name: string;
    }
  }

  export namespace resize {
    export type Params = {
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
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    }
  }

  export namespace crop {
    export type Params = {
      /** The ID of the image to crop. */
      imageId: string;
      /** The x-coordinate of the top-left corner of the crop area. */
      x1: number;
      /** The y-coordinate of the top-left corner of the crop area. */
      y1: number;
      /** The x-coordinate of the bottom-right corner of the crop area. */
      x2: number;
      /** The y-coordinate of the bottom-right corner of the crop area. */
      y2: number;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    }
  }

  export namespace mirror {
    /**
     * The mirror mode to apply to the image.
     * - `horizontal`: Mirror the image along the vertical axis.
     * - `vertical`: Mirror the image along the horizontal axis.
     * - `both`: Mirror the image along both axes.
     */
    export type Mode = 'horizontal' | 'vertical' | 'both';
    export type Params = {
      /** The ID of the image to mirror. */
      imageId: string;
      /** /*** The mirror mode to apply to the image. */
      mode: Mode;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    }
  }

  export namespace convert {
    export type Params<Format extends ImageObject.SupportedFormat> = {
      /** The ID of the image to convert. */
      imageId: string;
      /** The format to convert the image to. */
      format: Format;
      /** The quality of the converted image if the target format is `jpeg`. */
      quality?: number;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    }
  }

  export namespace rotate {
    export type Params = {
      /** The ID of the image to rotate. */
      imageId: string;
      /** The angle in degrees or radians rotate the image. */
      angle: number;
      /** The unit of the angle. Default is `degrees`. */
      unit?: 'degrees' | 'radians';
      /** The background color to fill the empty areas after rotating the image. Default is `#000000`. */
      background_color?: string;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    }
  }
}
