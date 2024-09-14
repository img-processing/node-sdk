import { describe, expect, test } from "vitest";
import { IMGProcessingClient } from "../src/api-client.js";

describe("createImageFromUrl", () => {
  const apiKey = process.env.IMG_PROCESSING_API_KEY;
  if (!apiKey) {
    throw new Error(
      "IMG_PROCESSING_API_KEY environment variable is required to run the tests",
    );
  }
  test("should create an image from a URL", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const url = "https://storage.img-processing.com/og-image.jpg";
    const image = await client.createImageFromUrl({ url, name: "test_image" });
    expect(image).toBeDefined();
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
    client.resize({
      imageId: "image_id",
      width: 100,
      height: 100,
    });
  });

  test("should throw error if no name is provided", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const url = "https://storage.img-processing.com/og-image.jpg";
    await expect(() =>
      client.createImageFromUrl({ url, name: undefined as never }),
    ).rejects.toThrow()
    try {
      await client.resize({
        imageId: "image_id",
        width: 100,
        height: 100,
      })
    } catch (e) {
      console.log(e)
    }

  });
});
