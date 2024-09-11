import { Blob, File } from "node:buffer";
import fs from "node:fs";
import * as path from "node:path";
import { describe, expect, test } from "vitest";
import { IMGProcessingClient } from "../src/api-client.js";
import { IMGProcessingAPIError } from "../src/api-error.js";

describe("uploadImage", () => {
  const apiKey = process.env
    .IMG_PROCESSING_API_KEY as IMGProcessingClient.APIKey;
  if (!apiKey) {
    throw new Error(
      "IMG_PROCESSING_API_KEY environment variable is required to run the tests",
    );
  }
  test("should upload an image in the filesystem", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const imagePath = path.join(__dirname, "assets", "test_image_1.jpeg");
    const image = await client.uploadImage({
      image: imagePath,
      name: "test_image",
    });
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
  });

  test("should upload an image as a buffer", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const imagePath = path.join(__dirname, "assets", "test_image_1.jpeg");
    const buffer = await fs.promises.readFile(imagePath);
    const image = await client.uploadImage({
      image: buffer,
      name: "test_image",
    });
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
  });

  test("should upload an image as a blob", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const imagePath = path.join(__dirname, "assets", "test_image_1.jpeg");
    const buffer = await fs.promises.readFile(imagePath);
    const blob = new Blob([buffer], { type: "image/jpeg" });
    const image = await client.uploadImage({ image: blob, name: "test_image" });
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
  });

  test("should upload an image as a file", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const imagePath = path.join(__dirname, "assets", "test_image_1.jpeg");
    const buffer = await fs.promises.readFile(imagePath);
    const file = new File([buffer], "test_image_1.jpeg", {
      type: "image/jpeg",
    });
    const image = await client.uploadImage({ image: file, name: "test_image" });
    expect(image.id).toMatch(/^image_[a-zA-Z0-9]{24}$/);
    expect(image.name).toBe("test_image");
  });

  test("should throw an error if the image is not a valid type", async () => {
    const client = new IMGProcessingClient({ apiKey });
    const imagePath = path.join(__dirname, "assets", "invalid.svg");
    expect(async () =>
      client.uploadImage({ image: imagePath, name: "test_image" }),
    ).rejects.toThrow(IMGProcessingAPIError);
  });
});
