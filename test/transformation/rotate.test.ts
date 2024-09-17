import { beforeAll, describe, expect, test } from "vitest";
import { IMGProcessingClient, type ImageObject } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("rotate", () => {
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

  test("should rotate an image", async () => {
    const rotatedImage = await uploadedImage.rotate({
      angle: 90,
    });
    expect(rotatedImage).toBeDefined();
    expect(rotatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(rotatedImage.name).toBe("test_image");
    expect(rotatedImage.width).toBe(uploadedImage.height);
    expect(rotatedImage.height).toBe(uploadedImage.width);
  });
});
