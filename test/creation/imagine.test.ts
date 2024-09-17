import { describe, expect, test } from "vitest";
import { IMGProcessingAPIError, IMGProcessingClient } from "../../src/index.js";
import { getApiKey } from "../helpers.js";

describe("imagine", () => {
  const client: IMGProcessingClient = new IMGProcessingClient({
    apiKey: getApiKey(),
  });

  test("should create an image from a prompt", async () => {
    const prompt = "a cat in the snow";
    const image = await client.imagine({
      prompt,
      name: "test_image",
      seed: 42,
    });
    expect(image).toBeDefined();
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
  });

  test("should handle API errors and wrap them in an IMGProcessingAPIError", async () => {
    const prompt = "a cat in the snow";
    await expect(() =>
      client.imagine({ prompt, name: "test_image", seed: 42.1 }),
    ).rejects.toThrow(IMGProcessingAPIError);
  });
});
