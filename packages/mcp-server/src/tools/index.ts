// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import retrieve_images from './images/retrieve-images';
import list_images from './images/list-images';
import delete_images from './images/delete-images';
import add_watermark_images from './images/add-watermark-images';
import blur_images from './images/blur-images';
import classify_images from './images/classify-images';
import convert_images from './images/convert-images';
import create_from_url_images from './images/create-from-url-images';
import crop_images from './images/crop-images';
import download_images from './images/download-images';
import extract_formatted_text_images from './images/extract-formatted-text-images';
import imagine_images from './images/imagine-images';
import mirror_images from './images/mirror-images';
import modulate_images from './images/modulate-images';
import publish_images from './images/publish-images';
import remove_background_images from './images/remove-background-images';
import resize_images from './images/resize-images';
import rotate_images from './images/rotate-images';
import unpublish_images from './images/unpublish-images';
import upload_images from './images/upload-images';
import visualize_images from './images/visualize-images';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(retrieve_images);
addEndpoint(list_images);
addEndpoint(delete_images);
addEndpoint(add_watermark_images);
addEndpoint(blur_images);
addEndpoint(classify_images);
addEndpoint(convert_images);
addEndpoint(create_from_url_images);
addEndpoint(crop_images);
addEndpoint(download_images);
addEndpoint(extract_formatted_text_images);
addEndpoint(imagine_images);
addEndpoint(mirror_images);
addEndpoint(modulate_images);
addEndpoint(publish_images);
addEndpoint(remove_background_images);
addEndpoint(resize_images);
addEndpoint(rotate_images);
addEndpoint(unpublish_images);
addEndpoint(upload_images);
addEndpoint(visualize_images);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
