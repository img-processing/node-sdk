/**
 * The Image object represents an image processed using the IMG Processing API. The object contains
 * information about the image, such as its URL, size, and format. The Image object is returned in the response body of
 * all image processing requests.
 */
export type ImageObject = {
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
  format: 'jpeg' | 'png' | 'webp';
  /** The estimated size of the image in bytes. The size is an estimate and may not be exact since images can be compressed or optimized depending
   on the format and quality settings used during processing. */
  size: number;
  /** The date and time when the image was created. The date and time are in ISO 8601 format. */
  created_at: string;
}