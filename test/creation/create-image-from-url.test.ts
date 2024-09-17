import { describe, expect, test } from "vitest";
import { IMGProcessingClient } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("createImageFromUrl", () => {
  const client: IMGProcessingClient = new IMGProcessingClient({
    apiKey: getApiKey(),
  });

  test("should create an image from a URL", async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    const image = await client.createImageFromUrl({ url, name: "test_image" });
    expect(image).toBeDefined();
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
    client.resize({
      image_id: "image_id",
      width: 100,
      height: 100,
    });
  });

  test("should throw error if no name is provided", async () => {
    const url = "https://storage.img-processing.com/og-image.jpg";
    await expect(() =>
      client.createImageFromUrl({ url, name: undefined as never }),
    ).rejects.toThrow();
  });
});
