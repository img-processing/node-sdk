import * as path from "node:path";

/**
 * Get the path of an asset in the `assets` directory
 * @param name - The name of the asset
 */
export function getAsset(name: string) {
  return path.join(__dirname, "assets", name);
}

/**
 * Validate the API key is set and return it
 */
export function getApiKey() {
  const apiKey = process.env.IMG_PROCESSING_API_KEY;
  if (!apiKey) {
    throw new Error(
      "IMG_PROCESSING_API_KEY environment variable is required to run the tests",
    );
  }
  return apiKey;
}
