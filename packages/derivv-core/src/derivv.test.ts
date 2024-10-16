import { expect, it } from "vitest";
import { resizeOne } from "./derivv";
import { createFileFromURL } from "./utils";

const fileName = "clean-vs-dirty-office.jpg";
// file image width and height is 967px
const imageUrl = new URL(`./${fileName}`, import.meta.url).href;
const original = await createFileFromURL(imageUrl);

it("resizes image proportionally", async () => {
  const target = {
    width: 100,
    height: 100,
  };
  const blob = await resizeOne(original, target);

  expect(blob).toBeInstanceOf(Blob);

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  expect(img.width).toBe(target.width);
  expect(img.height).toBe(target.height);
});

it("should throw and error if target is larger than original image", async () => {
  const target = {
    width: 1000,
    height: 1000,
  };

  await expect(resizeOne(original, target)).rejects.toThrow(
    "Cannot upscale image"
  );
});

it("should crop image with wider width", async () => {
  const target = {
    width: 100,
    height: 200,
  };
  const blob = await resizeOne(original, target);

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  expect(img.width).toBe(target.width);
  expect(img.height).toBe(target.height);
});

it("should crop image with wider height", async () => {
  const target = {
    width: 200,
    height: 100,
  };
  const blob = await resizeOne(original, target);

  const img = new Image();
  img.src = URL.createObjectURL(blob);
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  expect(img.width).toBe(target.width);
  expect(img.height).toBe(target.height);
});

it("should reduce the quality of the image", async () => {
  const img = new Image();
  img.src = imageUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const target = {
    width: img.width,
    height: img.height,
  };
  const blob = await resizeOne(original, target, { quality: 0.5 });
  const resized = new File([blob], fileName, { type: blob.type });

  expect(resized.size).toBeLessThan(original.size);
});

it("should crop image with custom coordinates", async () => {
  const target = {
    width: 967,
    height: 967,
  };
  const destImage = await resizeOne(original, target, {
    cropCoordinates: { x: 0, y: 0 },
  });
  const destImg = new Image();
  destImg.src = URL.createObjectURL(destImage);
  await new Promise((resolve) => {
    destImg.onload = resolve;
  });

  expect(destImg.width).toBe(target.width);
  expect(destImg.height).toBe(target.height);

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(destImg, 0, 0, destImg.width, destImg.height);
  const destImageData = ctx?.getImageData(0, 0, 1, 1);
  const destPixelData = destImageData?.data;

  const originalImg = new Image();
  originalImg.src = imageUrl;
  await new Promise((resolve) => {
    originalImg.onload = resolve;
  });

  ctx?.drawImage(originalImg, 0, 0, originalImg.width, originalImg.height);
  const originalImageData = ctx?.getImageData(0, 0, 1, 1);
  const originalPixelData = originalImageData?.data;

  // sample image top left color
  expect(originalPixelData?.[0]).toBe(destPixelData?.[0]);
  expect(originalPixelData?.[1]).toBe(destPixelData?.[1]);
  expect(originalPixelData?.[2]).toBe(destPixelData?.[2]);
  expect(originalPixelData?.[3]).toBe(destPixelData?.[3]);
});
