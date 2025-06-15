// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { ImgProcessing } from '../client';

export abstract class APIResource {
  protected _client: ImgProcessing;

  constructor(client: ImgProcessing) {
    this._client = client;
  }
}
