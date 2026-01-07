// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { multipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Images extends APIResource {
  /**
   * Sometimes you may need to retrieve a specific image information to get
   * information about the image, such as the image URL, the image size, or the image
   * format. This endpoint allows you to retrieve an image by its unique identifier.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.retrieve(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  retrieve(imageID: string, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.get(path`/v1/images/${imageID}`, options);
  }

  /**
   * This endpoint allows you to retrieve a list of all the images created by the
   * user. The images are returned in descending order of creation date, with the
   * most recent images first in the list.
   *
   * Images are paginated, following the pagination rules.
   *
   * @example
   * ```ts
   * const images = await client.images.list();
   * ```
   */
  list(
    query: ImageListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageListResponse> {
    return this._client.get('/v1/images', { query, ...options });
  }

  /**
   * Sometimes you may need to remove an image from the system. This endpoint allows
   * you to delete an image by its unique identifier, deleting all the data
   * associated with the image, and making it unavailable for future requests.
   *
   * Published images will no longer be accessible after deletion.
   *
   * @example
   * ```ts
   * await client.images.delete(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  delete(imageID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/images/${imageID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This endpoint allows you to add watermarks to an image. Watermarks are a great
   * way to protect your images from unauthorized use and to promote your brand.
   *
   * At the moment, you can only add image watermarks to your images. You must upload
   * your watermark, apply the transformations, and once you have the desired
   * watermark, apply it to your images using this endpoint.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.addWatermark(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   { watermarks: [{ id: 'id' }] },
   * );
   * ```
   */
  addWatermark(
    imageID: string,
    body: ImageAddWatermarkParams,
    options?: RequestOptions,
  ): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/watermark`, { body, ...options });
  }

  /**
   * This endpoint allows you to apply a blur effect to an image. Blurring an image
   * can be useful for various purposes, such as anonymizing sensitive information,
   * creating a soft-focus effect, loader skeletons, etc.
   *
   * Blurring an image depends on a factor sigma that determines the intensity of the
   * blur effect. The higher the value of sigma, the more intense the blur effect
   * will be. This value represents the standard deviation of the Gaussian kernel
   * used to apply the blur effect.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.blur(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  blur(
    imageID: string,
    body: ImageBlurParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/blur`, { body, ...options });
  }

  /**
   * The classify endpoint allows you to classify an image using a pre-trained model.
   * At the moment, the only supported model is the ResNet50 model, a deep learning
   * model that excels at image classification tasks.
   *
   * The endpoint will return a list of labels and their probabilities for the image.
   *
   * @example
   * ```ts
   * const response = await client.images.classify(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  classify(imageID: string, options?: RequestOptions): APIPromise<ImageClassifyResponse> {
    return this._client.post(path`/v1/images/${imageID}/classify`, options);
  }

  /**
   * With this endpoint, you can create a new image by converting an existing image
   * to a different format.
   *
   * The supported image formats are jpeg, png, and webp.
   *
   * - JPEG (Joint Photographic Experts Group): A commonly used method of lossy
   *   compression for digital images, particularly for those images produced by
   *   digital photography. JPEG compression significantly reduces the file size, but
   *   it can also reduce the image quality.
   * - PNG (Portable Network Graphics): A raster-graphics file format that supports
   *   lossless data compression. PNG is often used for images that require
   *   transparency or when the image quality must be preserved without any loss.
   * - WebP: A modern image format that provides superior lossless and lossy
   *   compression for images on the web. WebP images are smaller in size compared to
   *   JPEG and PNG, while maintaining similar or better image quality
   *
   * @example
   * ```ts
   * const imageObject = await client.images.convert(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   { format: 'jpeg' },
   * );
   * ```
   */
  convert(imageID: string, body: ImageConvertParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/convert`, { body, ...options });
  }

  /**
   * The first step to start processing images with the IMG Processing API is to
   * create an Image Object. You can create an Image object by uploading an image
   * file or by providing a URL to an existing image.
   *
   * This endpoint allows you to create an Image object by providing a URL to an
   * existing image. The API will download the image from the provided URL, so make
   * sure the URL is accessible and the image is publicly available.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.createFromURL({
   *   name: 'example-image',
   *   url: 'https://example.com/image.jpg',
   * });
   * ```
   */
  createFromURL(body: ImageCreateFromURLParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post('/v1/images', { body, ...options });
  }

  /**
   * With this endpoint, you can crop an image by specifying the dimensions of the
   * crop area.
   *
   * The crop area is defined by 2 points: the top-left corner at (x1, y1) and the
   * bottom-right corner at (x2, y2)
   *
   * @example
   * ```ts
   * const imageObject = await client.images.crop(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   {
   *     x1: 0,
   *     x2: 0,
   *     y1: 0,
   *     y2: 0,
   *   },
   * );
   * ```
   */
  crop(imageID: string, body: ImageCropParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/crop`, { body, ...options });
  }

  /**
   * This endpoint allows you to download an image by its unique identifier. The
   * image is returned as a binary response.
   *
   * This request is authenticated, so it is not recommended to share this URL with
   * others. Use this endpoint to download images in your application or service, and
   * serve them to your users, or use the publish endpoint to generate a public link
   * to share the image with others.
   *
   * @example
   * ```ts
   * const response = await client.images.download(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(imageID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/images/${imageID}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: 'image/*' }, options?.headers]),
      __binaryResponse: true,
    });
  }

  /**
   * This endpoint extracts the text from an image and returns its content in the
   * format specified in the request.
   *
   * The format can be either `plain` or `markdown`. The API will return all the text
   * from the image, trying to maintain the document structure as much as possible.
   *
   * @example
   * ```ts
   * const response = await client.images.extractFormattedText(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  extractFormattedText(
    imageID: string,
    body: ImageExtractFormattedTextParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageExtractFormattedTextResponse> {
    return this._client.post(path`/v1/images/${imageID}/extract-formatted-text`, { body, ...options });
  }

  /**
   * The imagine endpoint allows you to create a new image using AI. At the moment,
   * there is support for the models: ByteDance SDXL-Lightning and Flux, which
   * generates good quality images from text descriptions.
   *
   * The images generated by the endpoint has a resolution of 1024x1024 pixels and
   * are saved in JPEG format.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.imagine({
   *   name: 'example-image',
   *   prompt: 'A beautiful sunset over the ocean.',
   * });
   * ```
   */
  imagine(body: ImageImagineParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post('/v1/images/imagine', { body, ...options });
  }

  /**
   * With this endpoint, you can mirror an existing image horizontally or vertically
   * to create a new image.
   *
   * Mirror an image horizontally means that the image is mirrored along the vertical
   * axis, while flipping an image vertically means that the image is mirrored along
   * the horizontal axis. You can also mirror an image horizontally and vertically at
   * the same time using the mode both
   *
   * @example
   * ```ts
   * const imageObject = await client.images.mirror(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   { mode: 'horizontal' },
   * );
   * ```
   */
  mirror(imageID: string, body: ImageMirrorParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/mirror`, { body, ...options });
  }

  /**
   * This endpoint allows you to adjust the brightness, saturation, and hue of an
   * image.
   *
   * Brightness is one of the three properties of color, along with hue and
   * saturation. It refers to the amount of light in an image, with a high brightness
   * making the image lighter and a low brightness making the image darker.
   *
   * Contrast is the difference in brightness between the lightest and darkest parts
   * of an image. A high contrast image will have a wide range of brightness values,
   * while a low contrast image will have a narrow range of brightness values.
   *
   * Finally, exposure refers to the amount of light that reaches the camera sensor
   * when taking a photo. A high exposure value will make the image brighter, while a
   * low exposure value will make the image darker.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.modulate(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  modulate(
    imageID: string,
    body: ImageModulateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/modulate`, { body, ...options });
  }

  /**
   * By default, all images created using the API are private and can only be
   * accessed by the user who created them via the API key. This endpoint allows you
   * to make a private image public, so that it can be accessed by anyone.
   *
   * Publishing an image adds it to a CDN, allowing it to be accessed faster and more
   * efficiently.
   *
   * After publishing an image, the url field of the image object will be updated
   * with the public URL. You can still access the image using the private download
   * URL, but the public URL can be shared with others.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.publish(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  publish(imageID: string, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/publish`, options);
  }

  /**
   * This endpoint allows you to remove the background from an image. Removing the
   * background from an image can be useful for various purposes, such as creating a
   * transparent background or isolating the subject of the image.
   *
   * The background removal process works by segmenting the image into foreground and
   * background regions. The API uses advanced machine learning algorithms to detect
   * and remove the background from the image, leaving only the foreground subject.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.removeBackground(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  removeBackground(
    imageID: string,
    body: ImageRemoveBackgroundParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/remove-background`, { body, ...options });
  }

  /**
   * This endpoint creates a new image by resizing an existing image.
   *
   * At the moment, there are three fit modes available:
   *
   * Fit Modes Available fit modes
   *
   * - fill: The image is resized to fill the specified dimensions,
   *   stretching/squishing the image to fit the provided dimensions. This is the
   *   default fit mode.
   * - contain: The image is resized to fit within the specified dimensions,
   *   maintaining the aspect ratio, and adding a letterbox if necessary.
   * - cover: The image is resized to cover the specified dimensions, maintaining the
   *   aspect ratio, cropping/clipping the image if necessary. Additionally, you can
   *   specify the background color for the letterbox when using the contain fit
   *   mode, and the gravity for cropping or positioning the image when using the
   *   cover and contain fit modes.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.resize(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  resize(
    imageID: string,
    body: ImageResizeParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/resize`, { body, ...options });
  }

  /**
   * This endpoint creates a new image by rotating the original image.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.rotate(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   { angle: 0 },
   * );
   * ```
   */
  rotate(imageID: string, body: ImageRotateParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/rotate`, { body, ...options });
  }

  /**
   * With this endpoint, you can unpublish an image that was previously published
   * using the Publish Image endpoint. This will remove the image from the CDN and
   * make it private again.
   *
   * After unpublishing an image, the url field of the image object will be updated
   * with to null. You can still download the image using the Download Image
   * endpoint.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.unpublish(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   * );
   * ```
   */
  unpublish(imageID: string, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(path`/v1/images/${imageID}/unpublish`, options);
  }

  /**
   * The first step to start processing images with the IMG Processing API is to
   * create an Image Object. You can create an Image object by uploading an image
   * file or by providing a URL to an existing image.
   *
   * This endpoint allows you to create an Image object by uploading an image file.
   *
   * To upload an image, you need to send a multipart/form-data request to the API
   * with the image file as a File object stringified in the image field, and name
   * field with the name of the image for identification purposes.
   *
   * @example
   * ```ts
   * const imageObject = await client.images.upload({
   *   image: fs.createReadStream('path/to/file'),
   *   name: 'example-image',
   * });
   * ```
   */
  upload(body: ImageUploadParams, options?: RequestOptions): APIPromise<ImageObject> {
    return this._client.post(
      '/v1/images/upload',
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * This endpoint returns a response based on the content of an image and a base
   * prompt.
   *
   * The prompt can be a question, statement, or any text that you want to ask about
   * the image. The API will analyze the content of the image and generate a response
   * based on the prompt using a pre-trained model.
   *
   * Right now there are three models available for this endpoint:
   *
   * - Uform-Gen: UForm-Gen is a small generative vision-language model primarily
   *   designed for Image Captioning and Visual Question Answering.
   * - Llava: LLaVA is a large multimodal model that can generate text based on
   *   images and text prompts.
   * - Gemini: Gemini is a multimodal model with advanced capabilities for
   *   understanding and generating text based on images.
   *
   * @example
   * ```ts
   * const response = await client.images.visualize(
   *   'image_etm0g3x5iap4cld1qcfsjvo2',
   *   { prompt: 'What is in this image?' },
   * );
   * ```
   */
  visualize(
    imageID: string,
    body: ImageVisualizeParams,
    options?: RequestOptions,
  ): APIPromise<ImageVisualizeResponse> {
    return this._client.post(path`/v1/images/${imageID}/visualize`, { body, ...options });
  }
}

/**
 * The Image object represents an image processed using the IMG Processing API. The
 * object contains information about the image, such as its URL, size, and format.
 * The Image object is returned in the response body of all image processing
 * requests.
 */
export interface ImageObject {
  /**
   * The unique identifier of the image. This identifier is used to reference the
   * image in subsequent requests.
   */
  id: string;

  /**
   * The date and time when the image was created. The date and time are in ISO 8601
   * format.
   */
  created_at: string;

  /**
   * The format of the image. The format can be one of the following: `jpeg`, `png`,
   * `webp`
   */
  format: 'png' | 'jpeg' | 'webp';

  /**
   * The height of the image in pixels.
   */
  height: number;

  /**
   * The name of the image. This name is provided when uploading the image and is the
   * way the image is identified in your account. It is not unique, in fact, each
   * transformation you make to an image will create a new image with the same name.
   */
  name: string;

  /**
   * The estimated size of the image in bytes. The size is an estimate and may not be
   * exact since images can be compressed or optimized depending on the format and
   * quality settings used during processing.
   */
  size: number;

  /**
   * The width of the image in pixels.
   */
  width: number;

  /**
   * The public URL of the image. By default, this URL is not available and will be
   * `null`. You can make the image public by using the publish endpoint. Once the
   * image is public, the URL will be updated with the public UR.
   */
  url?: string | null;
}

/**
 * The PaginatedImageResponse object represents a paginated response containing a
 * list of images. It includes an array of Image objects and links to navigate
 * through the pages of results.
 */
export interface ImageListResponse {
  /**
   * An array of Image objects representing the images in the current page.
   */
  data: Array<ImageObject>;

  links: ImageListResponse.Links;
}

export namespace ImageListResponse {
  export interface Links {
    /**
     * The URL to the next page of results, if available. If there is no next page,
     * this will be `null`.
     */
    next?: string | null;

    /**
     * The URL to the previous page of results, if available. If there is no previous
     * page, this will be `null`.
     */
    previous?: string | null;
  }
}

/**
 * Response object for image identification. Contains the main label and secondary
 * labels with their scores.
 */
export interface ImageClassifyResponse {
  /**
   * The main label of the image. This is the label with the highest probability.
   */
  main_label: string;

  /**
   * The probability score of the main label. This is a number between 0 and 1.
   */
  main_score: number;

  /**
   * An array of secondary labels with their respective scores. These are the labels
   * with lower probabilities than the main label.
   */
  secondary_labels: Array<ImageClassifyResponse.SecondaryLabel>;
}

export namespace ImageClassifyResponse {
  export interface SecondaryLabel {
    /**
     * The label of the secondary label. This is the label with a lower probability
     * than the main label.
     */
    label: string;

    /**
     * The probability score of the secondary label. This is a number between 0 and 1.
     */
    score: number;
  }
}

/**
 * Response object for extracting formatted text from an image. Contains the format
 * and content of the extracted text.
 */
export interface ImageExtractFormattedTextResponse {
  /**
   * The content of the image processed in the desired format.
   */
  content: string;

  /**
   * The format of the extracted text. It can be either plain text or markdown.
   */
  format: 'plain' | 'markdown';
}

/**
 * Response object for the visualize endpoint.
 */
export interface ImageVisualizeResponse {
  /**
   * The response from the AI model. This is the description of the image based on
   * the prompt provided.
   */
  response: string;
}

export interface ImageListParams {
  /**
   * The image ID to start from when listing images. If provided, the list will
   * include images created after this ID. Must be a valid image ID.
   */
  from?: string;

  /**
   * The number of images to return. Must be between 1 and 100. Defaults to 10.
   */
  take?: number;
}

export interface ImageAddWatermarkParams {
  /**
   * An array of watermark objects to apply to the image
   */
  watermarks: Array<ImageAddWatermarkParams.Watermark>;

  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;
}

export namespace ImageAddWatermarkParams {
  export interface Watermark {
    /**
     * The ID of the image to use as a watermark. Must be a valid image ID.
     */
    id: string;

    /**
     * The height of the watermark in pixels. If not provided, the watermark will be
     * applied at its original height.
     */
    height?: number;

    /**
     * The position of the watermark from the left of the image to apply the watermark.
     * If not provided, the watermark will be applied at the left of the image.
     */
    left?: number;

    /**
     * The repetition mode of the watermark. If not provided, the watermark will be
     * applied once
     */
    repetition_mode?: 'repeat' | 'no_repeat' | 'repeat_x' | 'repeat_y';

    /**
     * The position of the watermark from the top of the image to apply the watermark.
     * If not provided, the watermark will be applied at the top of the image.
     */
    top?: number;

    /**
     * The width of the watermark in pixels. If not provided, the watermark will be
     * applied at its original width.
     */
    width?: number;
  }
}

export interface ImageBlurParams {
  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;

  /**
   * The standard deviation of the Gaussian kernel used to apply the blur effect.
   */
  sigma?: number;
}

export interface ImageConvertParams {
  /**
   * The format to convert the image to. Supported formats are jpeg, png, webp, jpg.
   */
  format: 'jpeg' | 'png' | 'webp' | 'jpg';

  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;

  /**
   * The quality of the image to convert. It is a number between 1 and 100. If not
   * provided, a default quality will be used.
   */
  quality?: number;
}

export interface ImageCreateFromURLParams {
  /**
   * The name of the image to identify it on the dashboard
   */
  name: string;

  /**
   * The URL of the image to download. It must point to a supported image format
   * (jpeg, png, webp).
   */
  url: string;
}

export interface ImageCropParams {
  /**
   * The x-coordinate of the top-left corner of the crop area.
   */
  x1: number;

  /**
   * The x-coordinate of the bottom-right corner of the crop area.
   */
  x2: number;

  /**
   * The y-coordinate of the top-left corner of the crop area.
   */
  y1: number;

  /**
   * The y-coordinate of the bottom-right corner of the crop area.
   */
  y2: number;

  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;
}

export interface ImageExtractFormattedTextParams {
  /**
   * The format of the extracted text. It can be markdown or plain text. If not
   * provided, plain text will be used as default.
   */
  format?: 'markdown' | 'plain';
}

export interface ImageImagineParams {
  /**
   * The name of the image to identify it on the dashboard.
   */
  name: string;

  /**
   * The prompt for the image. It should describe what you want to see in the
   * generated image.
   */
  prompt: string;

  /**
   * The model to use for the image. If not provided, the default model will be used.
   */
  model?: 'sdxl' | 'flux';

  /**
   * The negative prompt for the image. It should describe what you don't want to see
   * in the generated image.
   */
  negative_prompt?: string;

  /**
   * The seed for the image. It is used to generate the image. If not provided, a
   * random seed will be used.
   */
  seed?: number;
}

export interface ImageMirrorParams {
  /**
   * The mode of mirroring. It can be horizontal, vertical, or both.
   */
  mode: 'horizontal' | 'vertical' | 'both';

  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;
}

export interface ImageModulateParams {
  /**
   * The brightness level to apply to the image. The difference between the
   * brightness and lightness parameters is that brightness multiplies the color
   * values, while lightness adds a constant value to the color values. Value should
   * be between -100 and 100, where 0 is no change.
   */
  brightness?: number;

  contrast?: number;

  /**
   * The exposure multiplier to apply to the image.
   */
  exposure?: number;

  /**
   * The name of the modulation. This is used to identify the modulation in the
   * dashboard.
   */
  name?: string;

  /**
   * The saturation multiplier to apply to the image.
   */
  saturation?: number;
}

export interface ImageRemoveBackgroundParams {
  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;
}

export interface ImageResizeParams {
  /**
   * The fit mode to use when resizing the image.
   */
  fit?: 'cover' | 'contain' | 'fill';

  /**
   * The height of the image to resize. It must be an integer greater than 0 and less
   * than 10000. If not provided, the resized image will keep the aspect ratio of the
   * original image.
   */
  height?: number;

  /**
   * The color of the letterbox when using the contain fit mode. It can be a color
   * name, a hex color code, or transparent.
   */
  letterbox_color?: string;

  /**
   * The name of the resized image. It is used to identify the image on the
   * dashboard.
   */
  name?: string;

  /**
   * The gravity position of the image when using the cover or contain fit modes.
   */
  position?:
    | 'center'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

  /**
   * The width of the image to resize. It must be an integer greater than 0 and less
   * than 10000. If not provided, the resized image will keep the aspect ratio of the
   * original image.
   */
  width?: number;
}

export interface ImageRotateParams {
  /**
   * The angle in degrees or radians rotate the image.
   */
  angle: number;

  /**
   * The name of the image to identify it on the dashboard.
   */
  name?: string;

  /**
   * The unit of the angle. Defaults to degrees if not provided.
   */
  unit?: 'degrees' | 'radians';
}

export interface ImageUploadParams {
  /**
   * The image file to upload. It must be a valid image format (jpeg, png, webp) and
   * not larger than 20MB.
   */
  image: Uploadable;

  /**
   * The name of the image to identify it on the dashboard.
   */
  name: string;
}

export interface ImageVisualizeParams {
  /**
   * The prompt to answer based on the content of the image. This is a natural
   * language question or instruction that the model will respond to.
   */
  prompt: string;

  /**
   * The model to use for the visualization. Supported models are uform-gen, llava,
   * and gemini. If not provided, the default model will be used.
   */
  model?: 'uform-gen' | 'llava' | 'gemini';
}

export declare namespace Images {
  export {
    type ImageObject as ImageObject,
    type ImageListResponse as ImageListResponse,
    type ImageClassifyResponse as ImageClassifyResponse,
    type ImageExtractFormattedTextResponse as ImageExtractFormattedTextResponse,
    type ImageVisualizeResponse as ImageVisualizeResponse,
    type ImageListParams as ImageListParams,
    type ImageAddWatermarkParams as ImageAddWatermarkParams,
    type ImageBlurParams as ImageBlurParams,
    type ImageConvertParams as ImageConvertParams,
    type ImageCreateFromURLParams as ImageCreateFromURLParams,
    type ImageCropParams as ImageCropParams,
    type ImageExtractFormattedTextParams as ImageExtractFormattedTextParams,
    type ImageImagineParams as ImageImagineParams,
    type ImageMirrorParams as ImageMirrorParams,
    type ImageModulateParams as ImageModulateParams,
    type ImageRemoveBackgroundParams as ImageRemoveBackgroundParams,
    type ImageResizeParams as ImageResizeParams,
    type ImageRotateParams as ImageRotateParams,
    type ImageUploadParams as ImageUploadParams,
    type ImageVisualizeParams as ImageVisualizeParams,
  };
}
