import { useCallback, useState } from "react";
import {
  resize,
  ImageFile,
  ResizeOptions,
  Target,
  ImageError,
} from "@derivv/core";

export function useResize(targetSizes: Target[], options?: ResizeOptions) {
  const [images, setImages] = useState<ImageFile[] | null>(null);
  const [errors, setErrors] = useState<ImageError[] | null>(null);

  const _resize = useCallback(
    async (files: FileList | null): Promise<ImageFile[] | undefined> => {
      if (!files) return;

      setImages(null);
      setErrors(null);

      const { images, errors } = await resize(files, targetSizes, options);

      setImages(images);
      setErrors(errors);

      return images;
    },
    [targetSizes, options]
  );

  return { images, resize: _resize, errors };
}
