import { Blob, type File } from "node:buffer";
import * as fs from "node:fs";
import { fileTypeFromBuffer } from "file-type";
import ky, { HTTPError, type KyInstance, type ResponsePromise } from "ky";
import { IMGProcessingAPIError } from "./api-error.js";
import { ImageObject } from "./image-object.js";

export class IMGProcessingClient {
  protected readonly client: KyInstance;

  constructor({ apiKey }: IMGProcessingClient.ClientOptions) {
    this.client = ky.create({
      prefixUrl: "https://api.img-processing.com/",
      headers: {
        "x-api-key": apiKey,
      },
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
      throw new Error(
        "An unexpected error occurred. Create an issue: https://github.com/img-processing/node-sdk/issues",
      );
    }
  }

  protected async imageRequest<
    Format extends ImageObject.SupportedFormat = ImageObject.SupportedFormat,
  >(call: () => ResponsePromise<ImageObject>): Promise<ImageObject<Format>> {
    const response = await this.request(call);
    return new ImageObject({
      image: response,
      client: this,
    }) as ImageObject<Format>;
  }

  /**
   * -----------------------------------------
   * Creation
   * -----------------------------------------
   */

  /**
   * The first step to start processing images with the IMG Processing API is
   * to create an {@link ImageObject} object.
   *
   * This function allows you to create an Image object by uploading an image.
   */
  async uploadImage({
    image,
    name,
  }: IMGProcessingClient.uploadImage.Params): Promise<ImageObject> {
    const formData = new FormData();
    formData.append("name", name);

    if (typeof image === "string") {
      // The image is a file in the file system
      const imageFile = await fs.promises.readFile(image);
      const mimeType = (await fileTypeFromBuffer(imageFile))?.mime;
      formData.append(
        "image",
        new Blob([imageFile], {
          type: mimeType,
        }),
      );
    } else if (image instanceof Buffer) {
      const mimeType = (await fileTypeFromBuffer(image))?.mime;
      formData.append(
        "image",
        new Blob([image], {
          type: mimeType,
        }),
      );
    } else {
      formData.append("image", image);
    }

    return this.imageRequest(() =>
      this.client.post("v1/images/upload", {
        body: formData,
        headers: {},
      }),
    );
  }

  /**
   * The first step to start processing images with the IMG Processing API is
   * to create an {@link ImageObject} object.
   *
   * This function allows you to create an Image object by downloading an image from a URL.
   *
   * Allowed Origins: IMG Processing Storage, Amazon S3, Azure Blob Storage, Cloudflare R2, Dropbox, Google Cloud Storage, Google Drive, OneDrive
   */
  async createImageFromUrl({
    url,
    name,
  }: IMGProcessingClient.createImageFromUrl.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>("v1/images", {
        json: {
          url,
          name,
        },
      }),
    );
  }

  /**
   * The first step to start processing images with the IMG Processing API is
   * to create an {@link ImageObject} object.
   *
   * This function allows you to generate a new image from a given prompt.
   */
  async imagine({
    prompt,
    negative_prompt,
    name,
  }: IMGProcessingClient.imagine.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>("v1/images/imagine", {
        json: {
          prompt,
          negative_prompt,
          name,
        },
      }),
    );
  }

  /**
   * -----------------------------------------
   * Edition
   * -----------------------------------------
   */

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
    imageId,
    brightness,
    saturation,
    hue,
    lightness,
    name,
  }: IMGProcessingClient.modulate.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/modulate`, {
        json: {
          brightness,
          saturation,
          hue,
          lightness,
          name,
        },
      }),
    );
  }

  /**
   * Remove the background from an image.
   * Removing the background from an image can be useful for various purposes, such as creating a transparent background or isolating the subject of the image.
   *
   * The background removal process works by segmenting the image into foreground and background regions.
   * The API uses advanced machine learning algorithms to detect and remove the background from the image, leaving only the foreground subject.
   */
  async removeBackground({
    imageId,
    name,
  }: IMGProcessingClient.removeBackground.Params): Promise<ImageObject<"png">> {
    return this.imageRequest(() =>
      this.client.post<ImageObject<"png">>(
        `v1/images/${imageId}/remove-background`,
        {
          json: {
            name,
          },
        },
      ),
    );
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
    imageId,
    watermarks,
    name,
  }: IMGProcessingClient.watermark.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/watermark`, {
        json: {
          watermarks,
          name,
        },
      }),
    );
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
   *
   * - **JPEG (Joint Photographic Experts Group):** A commonly used method of lossy compression for digital images,
   * particularly for those images produced by digital photography. JPEG compression significantly reduces the file size, but it can also reduce the image quality.
   * - **PNG (Portable Network Graphics):** A raster-graphics file format that supports lossless data compression.
   * PNG is often used for images that require transparency or when the image quality must be preserved without any loss.
   * - **WebP:** A modern image format that provides superior lossless and lossy compression for images on the web.
   * WebP images are smaller compared to JPEG and PNG, while maintaining similar or better image quality.
   */
  async convert<Format extends ImageObject.SupportedFormat>({
    imageId,
    format,
    name,
  }: IMGProcessingClient.convert.Params<Format>): Promise<ImageObject<Format>> {
    return this.imageRequest(() =>
      this.client.post<ImageObject<Format>>(`v1/images/${imageId}/convert`, {
        json: {
          format,
          name,
        },
      }),
    );
  }

  /**
   * Crop an image by specifying the dimensions of the crop area.
   *
   * The crop area is defined by 2 points: the top-left corner at `(x1, y1)` and the bottom-right corner at `(x2, y2)`.
   */
  async crop({
    imageId,
    x1,
    y1,
    x2,
    y2,
    name,
  }: IMGProcessingClient.crop.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/crop`, {
        json: {
          x1,
          y1,
          x2,
          y2,
          name,
        },
      }),
    );
  }

  /**
   * Mirror an existing image horizontally or vertically to create a new image.
   *
   * Mirror an image horizontally means that the image is mirrored along the vertical axis, while flipping an
   * image vertically means that the image is mirrored along the horizontal axis. You can also mirror an image
   * horizontally and vertically at the same time using the mode `both`.
   */
  async mirror({
    imageId,
    mode,
    name,
  }: IMGProcessingClient.mirror.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/mirror`, {
        json: {
          mode,
          name,
        },
      }),
    );
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
  async resize({
    imageId,
    width,
    height,
    fit,
    name,
    position,
  }: IMGProcessingClient.resize.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/resize`, {
        json: {
          width,
          height,
          fit,
          name,
          position,
        },
      }),
    );
  }

  /**
   * Rotate an existing image by a specified angle.
   */
  async rotate({
    imageId,
    angle,
    unit,
    name,
  }: IMGProcessingClient.rotate.Params): Promise<ImageObject> {
    return this.imageRequest(() =>
      this.client.post<ImageObject>(`v1/images/${imageId}/rotate`, {
        json: {
          angle,
          unit,
          name,
        },
      }),
    );
  }
}

export declare namespace IMGProcessingClient {
  export type APIKey = `live_${string}` | `test_${string}`;

  export type ClientOptions = {
    apiKey: APIKey;
  };

  export type Error = {
    type: string;
    error: string;
    status: number;
    message?: string;
    errors?: string[];
  };

  export namespace uploadImage {
    type FilePath = string;
    export type Params = {
      /** The image to upload. */
      image: Blob | File | FilePath | Buffer;
      /** The name of the image. */
      name: string;
    };
  }

  export namespace createImageFromUrl {
    export type Params = {
      /** The URL of the image to download. */
      url: string;
      /** The name of the image. */
      name: string;
    };
  }

  export namespace imagine {
    export type Params = {
      /** The prompt to generate the image. */
      prompt: string;
      /** The things to avoid in the generated image. */
      negative_prompt?: string;
      /** The name of the image. */
      name: string;
    };
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
      fit?: "fill" | "contain" | "cover";
      /** The color of the letterbox when using the `contain` fit mode.
       It can be a color name, a hex color code, or `transparent`. */
      letterbox_color?: string;
      /** The position of the image when using the `cover` or `contain` fit modes. */
      position?:
        | "center"
        | "top"
        | "right"
        | "bottom"
        | "left"
        | "top-left"
        | "top-right"
        | "bottom-left"
        | "bottom-right";
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
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
    };
  }

  export namespace mirror {
    /**
     * The mirror mode to apply to the image.
     * - `horizontal`: Mirror the image along the vertical axis.
     * - `vertical`: Mirror the image along the horizontal axis.
     * - `both`: Mirror the image along both axes.
     */
    export type Mode = "horizontal" | "vertical" | "both";
    export type Params = {
      /** The ID of the image to mirror. */
      imageId: string;
      /** /*** The mirror mode to apply to the image. */
      mode: Mode;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
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
    };
  }

  export namespace rotate {
    export type Params = {
      /** The ID of the image to rotate. */
      imageId: string;
      /** The angle in degrees or radians rotate the image. */
      angle: number;
      /** The unit of the angle. Default is `degrees`. */
      unit?: "degrees" | "radians";
      /** The background color to fill the empty areas after rotating the image. Default is `#000000`. */
      background_color?: string;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
  }

  export namespace watermark {
    export type Params = {
      /** The ID of the image to add watermarks. */
      imageId: string;
      /** An array of watermark objects to apply to the image. */
      watermarks: {
        /** The unique identifier of the image to use as a watermark. */
        id: string;
        /** The position of the watermark from the left of the image to apply the watermark. */
        left: number;
        /** The position of the watermark from the top of the image to apply the watermark. */
        top: number;
      }[];
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
  }

  export namespace modulate {
    export type Params = {
      /** The ID of the image to adjust the brightness, saturation, and hue. */
      imageId: string;
      /** The brightness multiplier to apply to the image. The difference between the `brightness` and `lightness` parameters is that `brightness` multiplies the color values, while `lightness` adds a constant value to the color values. */
      brightness?: number;
      /** The saturation multiplier to apply to the image. */
      saturation?: number;
      /** The hue rotation angle in degrees to apply to the image. */
      hue?: number;
      /** The lightness to add to the image. The difference between the `brightness` and `lightness` parameters is that `brightness` multiplies the color values, while `lightness` adds a constant value to the color values. */
      lightness?: number;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
  }

  export namespace removeBackground {
    export type Params = {
      /** The ID of the image to remove the background. */
      imageId: string;
      /** The name of the image. If not provided, the original image name will be used. */
      name?: string;
    };
  }
}
