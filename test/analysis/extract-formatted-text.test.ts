import { beforeAll, describe, expect, test } from "vitest";
import {
  IMGProcessingAPIError,
  IMGProcessingClient,
  type ImageObject,
} from "../../src/index.js";
import { getApiKey, getAsset } from "../test-helpers.js";

describe("extract formatted text", () => {
  const client: IMGProcessingClient = new IMGProcessingClient({
    apiKey: getApiKey(),
  });
  let uploadedImage: ImageObject;
  beforeAll(async () => {
    uploadedImage = await client.uploadImage({
      image: getAsset("test_image_1.jpeg"),
      name: "test_image",
    });
  });
  test("should extract text from an image", async () => {
    const response = await uploadedImage.extractFormattedText();
    expect(response).toMatchObject({
      format: "plain",
      content: expect.any(String),
    });
  });
});
