import { beforeAll, describe, expect, test } from "vitest";
import { IMGProcessingClient, type ImageObject } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("resize", () => {
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

  test("should resize the image", async () => {
    const modulatedImage = await uploadedImage.resize({
      width: 500,
      height: 500,
      fit: "contain",
      letterbox_color: "red",
    });
    expect(modulatedImage).toBeDefined();
    expect(modulatedImage.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(modulatedImage.name).toBe("test_image");
  });
});
