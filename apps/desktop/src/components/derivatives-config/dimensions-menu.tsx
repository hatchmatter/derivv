import { convertFileSrc } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

import { useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

import { Button } from "@derivv/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@derivv/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@derivv/ui/components/dropdown-menu";
import { Label } from "@derivv/ui/components/label";
import { Checkbox } from "@derivv/ui/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@derivv/ui/components/select";
import { useDerivativesConfig } from "@/hooks/use-derivatives-config";
import { UNITS, DPI } from "@/lib/constants";
import { parseCsv } from "@/lib/csv";

export function DimensionsMenu() {
  const settingsTriggerRef = useRef<HTMLDivElement>(null);
  const { dimensionsSettings, updateDimensionsSettings, dispatch } =
    useDerivativesConfig();

  const [units, setUnits] = useState(dimensionsSettings.units);
  const [dpi, setDpi] = useState(dimensionsSettings.dpi);
  const [display2x, setDisplay2x] = useState(dimensionsSettings["2x"]);
  const [display3x, setDisplay3x] = useState(dimensionsSettings["3x"]);

  const importCsv = async () => {
    const paths = await open({
      multiple: false,
      filters: [
        {
          name: "CSV",
          extensions: ["csv"],
        },
      ],
    });

    if (paths) {
      const src = convertFileSrc(paths[0]);
      const response = await fetch(src);
      const blob = await response.blob();
      const file = new File([blob], paths[0], { type: "text/csv" });
      const text = await file.text();
      const { headers, data } = parseCsv(text);
      console.log(headers, data);
    }
  };

  const renderDPI = () => {
    return (
      <>
        <Label>DPI</Label>
        <Select
          value={dpi.toString()}
          name="dpi"
          onValueChange={(value) => setDpi(parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select DPI" />
          </SelectTrigger>
          <SelectContent>
            {DPI.map((dpi) => (
              <SelectItem value={dpi.toString()} key={dpi}>
                {dpi}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    );
  };

  const renderDisplaySettings = () => {
    return (
      <div
        className=""
        title="Double and/or triple the size of the derivative images for retina and higher resolution displays"
      >
        <Label>Display</Label>
        <div className="flex items-center space-x-4 py-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="2x">@2x</Label>
            <Checkbox
              id="2x"
              name="2x"
              checked={display2x}
              onCheckedChange={(checked) => setDisplay2x(checked as boolean)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="3x">@3x</Label>
            <Checkbox
              id="3x"
              name="3x"
              checked={display3x}
              onCheckedChange={(checked) => setDisplay3x(checked as boolean)}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      units,
      dpi,
      "2x": display2x,
      "3x": display3x,
    };

    dispatch(updateDimensionsSettings(payload));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="sr-only">Dimensions menu</span>
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onSelect={() => settingsTriggerRef.current?.click()}
            >
              Settings
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={importCsv}>
              Import CSV
              <DropdownMenuShortcut>⌘+I</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* settings dialog */}
      <Dialog>
        <DialogTrigger>
          <div className="hidden" ref={settingsTriggerRef} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dimensions settings</DialogTitle>
            <DialogDescription>
              Settings for the dimensions of your images that apply to all
              derivative images.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-6">
              <div className="w-1/2">
                <Label>Units</Label>
                <Select
                  value={units}
                  name="units"
                  onValueChange={(value) => setUnits(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select units" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem value={unit} key={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/2">
                {units === "in" && renderDPI()}
                {units === "px" && renderDisplaySettings()}
              </div>
            </div>

            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
