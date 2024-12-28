import { useState, useCallback } from "react";
import { OriginalImages } from "@/components/original-images";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@derivv/ui/components/resizable";

export function ImageSetView() {
  const [images, setImages] = useState<Image[]>([]);

  const mergeImages = useCallback(
    (images: Image[]) => {
      setImages((prevImages) => [...prevImages, ...images]);
    },
    [setImages]
  );

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>derivatives</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={25} maxSize={35} defaultSize={35}>
            <OriginalImages onSelect={mergeImages} images={images} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel maxSize={25} minSize={15} defaultSize={20}>
        Config
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
