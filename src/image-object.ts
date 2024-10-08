import type { Blob } from "node:buffer";
import type { IMGProcessingClient } from "./api-client.js";
import type { WithoutImageId } from "./types.js";

/**
 * The Image object represents an image processed using the IMG Processing API. The object contains
 * information about the image, such as its URL, size, and format. The Image object is returned in the response body of
 * all image processing requests.
 */
export class ImageObject<
  Format extends ImageObject.SupportedFormat = ImageObject.SupportedFormat,
> implements ImageObject.Image<Format>
{
  public readonly id: `image_${string}`;
  public readonly name: string;
  public readonly width: number;
  public readonly height: number;
  public readonly format: Format;
  public readonly size: number;
  public readonly created_at: string;

  public get url(): string | null {
    return this.mutableUrl;
  }

  protected mutableUrl: string | null;

  /** The client used to interact with the IMG Processing API. */
  protected readonly client: IMGProcessingClient;

  constructor({ image, client }: ImageObject.ConstructorProps<Format>) {
    this.id = image.id;
    this.name = image.name;
    this.mutableUrl = image.url;
    this.width = image.width;
    this.height = image.height;
    this.format = image.format;
    this.size = image.size;
    this.created_at = image.created_at;
    this.client = client;
  }

  /**
   * -----------------------------------------
   * Access
   * -----------------------------------------
   */

  /**
   * Deletes the image from the IMG Processing API.
   */
  async delete(): Promise<void> {
    await this.client.deleteImage({ image_id: this.id });
  }

  /**
   * Download an image by its unique identifier.
   * The image is returned as a binary response.
   */
  async download(): Promise<Blob> {
    return await this.client.download({ image_id: this.id });
  }

  /**
   * Publish an image to make it publicly accessible.
   * Once an image is published, it will be accessible via a public URL.
   */
  async publish(): Promise<ImageObject> {
    const result = await this.client.publish({ image_id: this.id });
    this.mutableUrl = result.url;
    return this;
  }

  /**
   * Unpublish an image to make it private.
   * Once an image is unpublished, it will no longer be accessible via a public URL.
   */
  async unpublish(): Promise<ImageObject> {
    const result = await this.client.unpublish({ image_id: this.id });
    this.mutableUrl = result.url;
    return this;
  }

  /**
   * -----------------------------------------
   * Analysis
   * -----------------------------------------
   */

  /**
   * Classify an image using a pre-trained model.
   * At the moment, the only supported model is the [ResNet50](https://keras.io/api/applications/resnet/#resnet50-function) model,
   * a deep learning model that excels at image classification tasks.
   */
  async classify(): Promise<ImageObject.classify.Response> {
    return await this.client.classify({ image_id: this.id });
  }

  /**
   * Visualize an image using a pre-trained model and generate an answer based on the prompt.
   * The prompt can be a question, statement, or any text that you want to ask about the image. The API will analyze the content of the image and generate a response based on the prompt
   * using a pre-trained model.
   */
  async visualize({
    prompt,
    model,
  }: ImageObject.visualize.Params): Promise<ImageObject.visualize.Response> {
    return await this.client.visualize({
      image_id: this.id,
      prompt,
      model,
    });
  }


  /**
   * -----------------------------------------
   * Edition
   * -----------------------------------------
   */

  /**
   * Apply a blur effect to an image. Blurring an image can be useful for various purposes,
   * such as anonymizing sensitive information, creating a soft-focus effect, loader skeletons, etc.
   *
   * Blurring an image depends on a factor `sigma` that determines the intensity of the blur effect.
   * The higher the value of `sigma`, the more intense the blur effect will be.
   * This value represents the standard deviation of the Gaussian kernel used to apply the blur effect.
   */
  async blur({
    sigma,
    name
  } : ImageObject.blur.Params = {}): Promise<ImageObject> {
    return await this.client.blur({
      image_id: this.id,
      sigma,
      name,
    });
  }

  /**
   * Adjust the brightness, saturation, and hue of an image.
   *
   * Brightness is one of the three properties of color, along with hue and saturation. It refers to the amount of light in an image, with a high brightness making the image lighter and a low brightness making the image darker.
   *
   * On the other hand, saturation refers to the intensity of the colors in an image. A high saturation value will make the colors more vivid, while a low saturation value will make the colors more muted.
   *
   * Finally, hue refers to the color of the image. It is represented as a circular color space, with red, green, and blue forming the primary colors.
   */
  async modulate({
    brightness,
    saturation,
    hue,
    lightness,
    name,
  }: ImageObject.modulate.Params): Promise<ImageObject> {
    return await this.client.modulate({
      image_id: this.id,
      brightness,
      saturation,
      hue,
      lightness,
      name,
    });
  }

  /**
   * Remove the background from an image.
   * Removing the background from an image can be useful for various purposes, such as creating a transparent background or isolating the subject of the image.
   *
   * The background removal process works by segmenting the image into foreground and background regions.
   * The API uses advanced machine learning algorithms to detect and remove the background from the image, leaving only the foreground subject.
   */
  async removeBackground({
    name,
  }: ImageObject.removeBackground.Params = {}): Promise<ImageObject<"png">> {
    return await this.client.removeBackground({
      image_id: this.id,
      name,
    });
  }

  /**
   * -----------------------------------------
   * Multi-image
   * -----------------------------------------
   */

  /**
   * Add watermarks to an image.
   * Watermarks are a great way to protect your images from unauthorized use and to promote your brand.
   *
   * At the moment, you can only add image watermarks to your images.
   * You must upload your watermark,
   * apply the transformations, and once you have the desired watermark, apply it to your images using this endpo
   */
  async watermark({
    watermarks,
    name,
  }: ImageObject.watermark.Params): Promise<ImageObject> {
    return await this.client.watermark({
      image_id: this.id,
      watermarks,
      name,
    });
  }

  /**
   * -----------------------------------------
   * Transformation
   * -----------------------------------------
   */

  /**
   * Create a new image by converting an existing image to a different format.
   *
   * The supported image formats are `jpeg`, `png`, and `webp`.
   * - **JPEG (Joint Photographic Experts Group):** A commonly used method of lossy compression for digital images,
   * particularly for those images produced by digital photography.
   * JPEG compression significantly reduces the file size, but it can also reduce the image quality.
   * - **PNG (Portable Network Graphics):** A raster-graphics file format that supports lossless data compression.
   * PNG is often used for images that require transparency or when the image quality must be preserved without any loss.
   * - **WebP:** A modern image format that provides superior lossless and lossy compression for images on the web.
   * WebP images are smaller compared to JPEG and PNG, while maintaining similar or better image quality.
   */
  async convert<Format extends ImageObject.SupportedFormat>({
    format,
    quality,
    name,
  }: ImageObject.convert.Params<Format>): Promise<ImageObject<Format>> {
    return await this.client.convert({
      image_id: this.id,
      format,
      quality,
      name,
    });
  }

  /**
   * Crop an image by specifying the dimensions of the crop area.
   *
   * The crop area is defined by 2 points: the top-left corner at `(x1, y1)` and the bottom-right corner at `(x2, y2)`.
   */
  async crop({
    x1,
    y1,
    x2,
    y2,
    name,
  }: ImageObject.crop.Params): Promise<ImageObject> {
    return await this.client.crop({
      image_id: this.id,
      x1,
      y1,
      x2,
      y2,
      name,
    });
  }

  /**
   * Mirror an existing image horizontally or vertically to create a new image.
   *
   * Mirror an image horizontally means that the image is mirrored along the vertical axis, while flipping an
   * image vertically means that the image is mirrored along the horizontal axis.
   * You can also mirror an image
   * horizontally and vertically at the same time using the mode `both`.
   */
  async mirror({
    mode,
    name,
  }: ImageObject.mirror.Params): Promise<ImageObject> {
    return await this.client.mirror({
      image_id: this.id,
      mode,
      name,
    });
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
  async resize(options: ImageObject.resize.Params): Promise<ImageObject> {
    return await this.client.resize({
      image_id: this.id,
      ...options,
    });
  }

  /**
   * Rotate an existing image by a specified angle.
   */
  async rotate({
    angle,
    unit,
    name,
    background_color,
  }: ImageObject.rotate.Params): Promise<ImageObject> {
    return await this.client.rotate({
      image_id: this.id,
      angle,
      unit,
      name,
      background_color,
    });
  }
}

export declare namespace ImageObject {
  /** IMG Processing API image supported formats. */
  export type SupportedFormat = "jpeg" | "png" | "webp";
  /** ID of an Image object */
  export type ImageId = `image_${string}`;
  /**
   * The Image object represents an image processed using the IMG Processing API. The object contains
   * information about the image, such as its URL, size, and format. The Image object is returned in the response body of
   * all image processing requests.
   */
  export type Image<Format extends SupportedFormat = SupportedFormat> = {
    /** The unique identifier of the image. This identifier is used to reference the image in subsequent requests.*/
    id: ImageId;
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
    format: Format;
    /** The estimated size of the image in bytes. The size is an estimate and may not be exact since images can be compressed or optimized depending
     on the format and quality settings used during processing. */
    size: number;
    /** The date and time when the image was created. The date and time are in ISO 8601 format. */
    created_at: string;
  };
  export type ConstructorProps<
    Format extends SupportedFormat = SupportedFormat,
  > = {
    /** The IMG Processing API image object. */
    image: Image<Format>;
    /** The client used to interact with the IMG Processing API. */
    client: IMGProcessingClient;
  };
  export namespace resize {
    export type Params = WithoutImageId<IMGProcessingClient.resize.Params>;
  }
  export namespace crop {
    export type Params = WithoutImageId<IMGProcessingClient.crop.Params>;
  }
  export namespace convert {
    export type Params<Format extends SupportedFormat> = WithoutImageId<
      IMGProcessingClient.convert.Params<Format>
    >;
  }
  export namespace mirror {
    export type Params = WithoutImageId<IMGProcessingClient.mirror.Params>;
  }
  export namespace rotate {
    export type Params = WithoutImageId<IMGProcessingClient.rotate.Params>;
  }
  export namespace watermark {
    export type Params = WithoutImageId<IMGProcessingClient.watermark.Params>;
  }
  export namespace modulate {
    export type Params = WithoutImageId<IMGProcessingClient.modulate.Params>;
  }
  export namespace removeBackground {
    export type Params =
      WithoutImageId<IMGProcessingClient.removeBackground.Params>;
  }
  export namespace classify {
    export type Response = IMGProcessingClient.classify.Response;
  }
  export namespace visualize {
    export type Params = WithoutImageId<IMGProcessingClient.visualize.Params>;
    export type Response = IMGProcessingClient.visualize.Response;
  }
  export namespace blur {
    export type Params = WithoutImageId<IMGProcessingClient.blur.Params>;
  }
}
