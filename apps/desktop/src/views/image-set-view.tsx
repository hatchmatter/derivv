import { convertFileSrc } from "@tauri-apps/api/core";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@derivv/ui/components/resizable";

type Props = {
  children: React.ReactNode;
};

export function ImageSetView({ children }: Props) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel collapsible minSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel>derivatives</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={30} maxSize={30}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel maxSize={20} minSize={20}>
        Config
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export function DerivativeImages({ images }: { images: string[] }) {
  return (
    <div>
      {images.map((image) => (
        <img src={convertFileSrc(image)} key={image} />
      ))}
    </div>
  );
}
