import ky, { HTTPError, type KyInstance } from 'ky';
import type { ImageObject } from './image-object.js';
import * as fs from 'node:fs';
import {fileTypeFromBuffer} from 'file-type';
import { Blob, type File } from 'node:buffer';

export class IMGProcessingClient {
  protected readonly client: KyInstance;

  constructor({apiKey}: IMGProcessingClient.ClientOptions) {
    this.client = ky.create({
      prefixUrl: 'https://api.img-processing.com/v1/images',
      headers: {
        'x-api-key': apiKey,
      }
    });
  }

  protected async catchResponseError(response: Response): Promise<IMGProcessingClient.ErrorResponse> {
    const r = await response.json() as IMGProcessingClient.Error;
    return {
      success: false,
      error: r
    };
  }

  async uploadImage({ image, name }: IMGProcessingClient.uploadImage.Options): Promise<IMGProcessingClient.Response<ImageObject>> {
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

    try {
      const response = await this.client.post<ImageObject>('upload', {
        body: formData,
        headers: {
        }
      });

      return {
        success: true,
        data: await response.json()
      };
    } catch (error) {
      if (error instanceof HTTPError) {
        return this.catchResponseError(error.response);
      }
      throw new Error('An unexpected error occurred. Create an issue: https://github.com/img-processing/node-sdk/issues');
    }
  }
}

export declare namespace IMGProcessingClient {
  export type APIKey = `live_${string}` | `test_${string}`;

  export type ClientOptions = {
    apiKey: APIKey;
  }

  type SuccessResponse<T> = {
    success: true;
    data: T;
  }

  type Error = {
    type: string;
    title: string;
    status: number;
    message?: string;
    errors?: string[];
  }

  type ErrorResponse = {
    success: false;
    error: Error;
  }

  export type Response<T> = SuccessResponse<T> | ErrorResponse;

  namespace uploadImage {
    type FilePath = string;
    export type Options = {
      image: Blob | File | FilePath | Buffer;
      name: string;
    }

    export type Response = {
      id: string;
      name: string;
      url: string;
    }
  }
}

