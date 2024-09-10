import { IMGProcessingClient } from './api-client.js';
import type { WithoutImageId } from './types.js';

/**
 * The Image object represents an image processed using the IMG Processing API. The object contains
 * information about the image, such as its URL, size, and format. The Image object is returned in the response body of
 * all image processing requests.
 */
export class ImageObject implements ImageObject.Image {
  public readonly id: `image_${string}`;
  public readonly name: string;
  public readonly url: string | null;
  public readonly width: number;
  public readonly height: number;
  public readonly format: ImageObject.SupportedFormat;
  public readonly size: number;
  public readonly created_at: string;

  /** The client used to interact with the IMG Processing API. */
  protected readonly client: IMGProcessingClient;

  constructor({ image, client }: ImageObject.ConstructorProps) {
    this.id = image.id;
    this.name = image.name;
    this.url = image.url;
    this.width = image.width;
    this.height = image.height;
    this.format = image.format;
    this.size = image.size;
    this.created_at = image.created_at;
    this.client = client;
  }

  /**
   * Creates a new image by resizing the current image.
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
  async resize(options: ImageObject.resize.Options): Promise<ImageObject.Image> {
    return await this.client.resizeImage({
      imageId: this.id,
      ...options
    });
  }
}

export declare namespace ImageObject {
  /** IMG Processing API image supported formats. */
  export type SupportedFormat = 'jpeg' | 'png' | 'webp';
  /**
   * The Image object represents an image processed using the IMG Processing API. The object contains
   * information about the image, such as its URL, size, and format. The Image object is returned in the response body of
   * all image processing requests.
   */
  export type Image = {
    /** The unique identifier of the image. This identifier is used to reference the image in subsequent requests.*/
    id: `image_${string}`;
    /** The name of the image. This name is provided when uploading the image and is the way
     the image is identified in your account. It is not unique, in fact, each transformation you make
     to an image will create a new image with the same name.*/
    name: string;
    /** The public URL of the image. By default, this URL is not available and will be `null`.
     You can make the image public by using the [publish](/api-reference/endpoints/access/publish) endpoint.
     Once the image is public, the URL will be updated with the public URL. */
    url: string | null;
    /** The width of the image in pixels. */
    width: number;
    /** The height of the image in pixels. */
    height: number;
    /** The format of the image. */
    format: SupportedFormat;
    /** The estimated size of the image in bytes. The size is an estimate and may not be exact since images can be compressed or optimized depending
     on the format and quality settings used during processing. */
    size: number;
    /** The date and time when the image was created. The date and time are in ISO 8601 format. */
    created_at: string;
  }
  export type ConstructorProps = {
    /** The IMG Processing API image object. */
    image: Image;
    /** The client used to interact with the IMG Processing API. */
    client: IMGProcessingClient;
  }
  export namespace resize {
    export type Options = WithoutImageId<IMGProcessingClient.resizeImage.Options>;
  }
}