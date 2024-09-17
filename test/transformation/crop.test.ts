import { beforeAll, describe, expect, test } from "vitest";
import { IMGProcessingClient, type ImageObject } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("crop", () => {
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

  test("should crop the image", async () => {
    const modulatedImage = await uploadedImage.crop({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
    });
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
  });

  test("should throw validation error if x1 is not an integer", async () => {
    await expect(() =>
      uploadedImage.crop({
        x1: 0.5,
        y1: 0,
        x2: 100,
        y2: 100,
      }),
    ).rejects.toThrow();
  });
});
