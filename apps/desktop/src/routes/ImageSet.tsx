import { useState, useCallback } from "react";
import { ImageSetView } from "@/views/image-set-view";
import { OriginalImages } from "@/components/original-images";

export default function ImageSetRoute() {
  const [images, setImages] = useState<Image[]>([]);

  const mergeImages = useCallback(
    (images: Image[]) => {
      setImages((prevImages) => [...prevImages, ...images]);
    },
    [setImages]
  );

  return (
    <ImageSetView>
      <OriginalImages onSelect={mergeImages} images={images} />
    </ImageSetView>
  );
}
