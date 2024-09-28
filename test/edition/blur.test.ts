import { beforeAll, describe, expect, test } from "vitest";
import { IMGProcessingClient, type ImageObject } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("blur", () => {
  const client: IMGProcessingClient = new IMGProcessingClient({
    apiKey: getApiKey(),
  });
  let uploadedImage: ImageObject;

  beforeAll(async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    uploadedImage = await client.createImageFromUrl({
      url,
      name: "test_image",
    });
  });

  test("should blur an image", async () => {
    const blurredImage = await uploadedImage.blur();
    expect(blurredImage).toBeDefined();
    expect(blurredImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(blurredImage.name).toBe("test_image");
  });
});
