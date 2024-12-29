import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@derivv/ui/components/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@derivv/ui/components/tooltip";

export const DerivativesConfigFileType = () => {
  return (
    <div className="flex items-center gap-6 mt-2">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select File Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inherit">inherit</SelectItem>
          <SelectItem value="jpg">JPG</SelectItem>
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="webp">WebP</SelectItem>
        </SelectContent>
      </Select>
      <div className="text-sm text-gray-500">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info size={16} />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                By setting this option, you can override the file type of the<br />
                original images. If this is set to inherit (default), the file type of the<br />
                original image will be used.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
