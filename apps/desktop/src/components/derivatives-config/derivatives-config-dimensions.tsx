import { useSelector, useDispatch } from "react-redux";
import { Trash, CornerDownLeft, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@derivv/ui/components/button";
import { Input } from "@derivv/ui/components/input";
import { RootState } from "@/store";
import {
  addDimension,
  removeDimension,
} from "@/features/derivative-config-slice";
import { SectionTitle } from "@/components/section-title";
import { DropdownMenu } from "@/components/dropdown-menu-basic";

export const DerivativeConfigDimensions = () => {
  const { dimensions } = useSelector(
    (state: RootState) => state.present.derivativeConfig
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const width = formData.get("width");
    const height = formData.get("height");

    if (width === "" && height === "") {
      toast.warning(
        "Empty width and height values will not resize the image but will retain other configuration settings such as quality."
      );
    }

    dispatch(
      addDimension({
        width: Number(width),
        height: Number(height),
        id: crypto.randomUUID(),
      })
    );
  };

  return (
    <>
      <SectionTitle className="flex items-center justify-between">
        Dimensions
        <DropdownMenu
          data={[
            {
              items: [{ label: "Import CSV", shortcut: "⌘I" }],
            },
          ]}
        />
      </SectionTitle>
      <DimensionList dimensions={dimensions} />
      <form
        className="flex w-full max-w-sm items-center space-x-2 mt-2"
        onSubmit={handleSubmit}
      >
        <Input type="number" placeholder="Width" name="width" min={1} />
        <Input type="number" placeholder="Height" name="height" min={1} />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
        >
          <CornerDownLeft />
        </Button>
      </form>
    </>
  );
};

const DimensionList = ({
  dimensions,
  ...props
}: {
  dimensions: Dimension[];
}) => {
  const dispatch = useDispatch();

  return (
    <div {...props}>
      {dimensions.map((dimension) => {
        return (
          <div
            key={dimension.id}
            className="flex w-full max-w-sm items-center justify-between space-x-2 text-sm"
          >
            <div className="flex items-center space-x-2">
              <DimensionText>
                {dimension.width > 0 ? `${dimension.width}w` : "relative"}
              </DimensionText>
              <span>x</span>
              <DimensionText>
                {dimension.height > 0 ? `${dimension.height}h` : "relative"}
              </DimensionText>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="[&_svg]:size-3 hover:bg-transparent"
                onClick={() => dispatch(removeDimension(dimension))}
              >
                <Trash />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="[&_svg]:size-3 -ml-2 hover:bg-transparent"
                onClick={() => {
                  alert("Edit");
                }}
              >
                <Pencil />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DimensionText = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  return (
    <span
      className="rounded-md border border-transparent text-sm text-muted-foreground hover:border-border"
      {...props}
    >
      {children}
    </span>
  );
};
