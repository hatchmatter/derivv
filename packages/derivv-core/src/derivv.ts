import Pica from "pica";
import { expandFileName } from "./utils";

const pica = Pica();

export type Target = {
  width?: number;
  height?: number;
};

export type ResizeOptions = {
  quality?: number;
  disableCrop?: boolean;
  cropCoordinates?: {
    x: number;
    y: number;
  };
  metadata?: Record<string, unknown> & { name?: string };
};

export class ImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageError";
  }
}

export class ImageFile extends File {
  metadata: {
    width: number;
    height: number;
    [key: string]: unknown;
  };

  constructor(
    blob: BlobPart[],
    name: string,
    type: string,
    metadata: {
      width: number;
      height: number;
      originalWidth: number;
      originalHeight: number;
      originalSize: number;
      originalName: string;
      [key: string]: unknown;
    }
  ) {
    super(blob, name, { type });
    this.metadata = metadata;
  }
}

export async function resize(
  files: FileList,
  targetSizes: Target[],
  options?: ResizeOptions
): Promise<{
  images: ImageFile[];
  errors: ImageError[];
}> {
  const images: ImageFile[] = [];
  const errors: ImageError[] = [];

  for (const file of files) {
    for (const targetSize of targetSizes) {
      try {
        const image = await resizeOne(file, targetSize, options);
        images.push(image);
      } catch (error) {
        errors.push(error as ImageError);
      }
    }
  }

  return { images, errors };
}

export async function resizeOne(
  source: File,
  target: Target,
  options?: ResizeOptions
): Promise<ImageFile> {
  const sourceCanvas = document.createElement("canvas");
  const img = new Image();

  img.src = URL.createObjectURL(source);

  return new Promise((resolve, reject) => {
    img.onload = () => {
      const scale = getScale(img, target);

      if (scale > 1) {
        reject(
          new ImageError(
            `Cannot upscale image: ${source.name}. Original image size is smaller than target size.`
          )
        );
      }

      sourceCanvas.height = img.height * scale;
      sourceCanvas.width = img.width * scale;

      resolve(
        pica.resize(img, sourceCanvas).then(async (resultCanvas) => {
          let _canvas: HTMLCanvasElement;

          // if there isn't a width or height, we don't need to crop, we can just return the resultCanvas
          if (options?.disableCrop || !target.width || !target.height) {
            _canvas = resultCanvas;
          } else {
            _canvas = await crop(
              resultCanvas,
              target,
              options?.cropCoordinates
            );
          }

          const blob = await pica.toBlob(
            _canvas,
            source.type,
            options?.quality ?? 0.7 // anything better than 0.7 is adds to the originalfile size
          );
          const { name: fileName, extension } = expandFileName(source.name);
          const name =
            options?.metadata?.name ??
            `${fileName}-${target.width}x${target.height}.${extension}`;
          const file = new ImageFile([blob], name, source.type, {
            ...options?.metadata,
            originalWidth: img.width,
            originalHeight: img.height,
            originalSize: source.size,
            width: resultCanvas.width,
            height: resultCanvas.height,
            originalName: source.name,
          });

          return file;
        })
      );
    };
  });
}

function crop(
  canvas: HTMLCanvasElement,
  target: Target,
  cropCoordinates?: {
    x: number;
    y: number;
  }
): Promise<HTMLCanvasElement> {
  const img = new Image();
  img.src = canvas.toDataURL();

  return new Promise((resolve, reject) => {
    img.onload = () => {
      if (!target.width || !target.height) {
        reject(
          new ImageError(
            "Cannot crop image with undefined width and/or height. You need both."
          )
        );
      }

      canvas.width = target.width as number;
      canvas.height = target.height as number;

      const context = canvas.getContext("2d");

      if (context) {
        const x =
          cropCoordinates?.x ??
          Math.floor((target.width as number) / 2 - img.width / 2);
        const y =
          cropCoordinates?.y ??
          Math.floor((target.height as number) / 2 - img.height / 2);

        context.drawImage(img, x, y, img.width, img.height);

        resolve(canvas);
      } else {
        reject(
          new ImageError(
            "There was a problem loading canvas context while cropping"
          )
        );
      }
    };
  });
}

const getScale = (img: HTMLImageElement, target: Target) => {
  if (!target.width && !target.height) return 1;

  if (!target.height) {
    return target.width! / img.width;
  }

  if (!target.width) {
    return target.height / img.height;
  }

  // if the image is square and the target is also square, we can return the scale by width or height (doesn't matter)
  if (img.width === img.height && target.width === target.height) {
    return target.width / img.width;
  }

  // if the image is not square, we need to return the largest dimension ratio
  return Math.max(target.width / img.width, target.height / img.height);
};
