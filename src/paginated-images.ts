import type { IMGProcessingClient } from "./api-client.js";
import type { ImageObject } from "./image-object.js";
import type { Prettify } from "./types.js";

export class PaginatedImages<
  Format extends ImageObject.SupportedFormat = ImageObject.SupportedFormat,
> implements PaginatedImages.PaginatedImage<Format>
{
  data: ImageObject.Image<Format>[];
  links: {
    previous: string | null;
    next: string | null;
  };
  protected client: IMGProcessingClient;

  constructor({
    data,
    links,
    apiClient,
  }: PaginatedImages.constructor.Params<Format>) {
    this.data = data;
    this.links = links;
    this.client = apiClient;
  }

  /**
   * Returns the next page of results, if available. Otherwise, returns `undefined`.
   */
  public async next(): Promise<PaginatedImages<Format> | undefined> {
    if (!this.links.next) {
      return;
    }
    return this.client.goToPage({
      page: this.links.next,
    });
  }

  /**
   * Returns the previous page of results, if available. Otherwise, returns `undefined`.
   */
  public async previous(): Promise<PaginatedImages<Format> | undefined> {
    if (!this.links.previous) {
      return;
    }
    return this.client.goToPage({
      page: this.links.previous,
    });
  }
}

/**
 * All endpoints that list objects provide support for pagination. This allows you to retrieve a subset of the results at a time,
 * making it easier to manage large datasets.
 */
export namespace PaginatedImages {
  export type PaginatedImage<Format extends ImageObject.SupportedFormat> = {
    /** The list of items for the current page. */
    data: ImageObject.Image<Format>[];
    /** Links to the previous and next pages. */
    links: {
      /** The URL to fetch the previous page of results. */
      previous: string | null;
      /** The URL to fetch the next page of results. */
      next: string | null;
    };
  };
  export namespace constructor {
    export type Params<Format extends ImageObject.SupportedFormat> = Prettify<
      PaginatedImage<Format> & {
        apiClient: IMGProcessingClient;
      }
    >;
  }
}
