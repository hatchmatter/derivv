import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Input } from "@derivv/ui/components/input";
import { DerivativeConfigDimensions } from "@/components/derivatives-config/derivatives-config-dimensions";
import { DerivativesConfigQuality } from "@/components/derivatives-config/derivatives-config-quality";
import { DerivativesConfigAdvanced } from "@/components/derivatives-config/derivatives-config-advanced";

import { RootState } from "@/store";
import { setConfigName } from "@/features/derivative-config-slice";
import { DropdownMenu } from "@/components/dropdown-menu-basic";

const dropdownMenuData = [
  {
    items: [
      {
        label: "Save",
        shortcut: "⇧⌘S",
      },
      {
        label: "Save As Template",
        shortcut: "⇧⌘T",
      },
      {
        label: "Load Template",
        shortcut: "⇧⌘L",
      },
    ],
  },
];

export function DerivativesConfig() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center tracking-tight text-sm font-normal">
        Derivatives Configuration
        <DropdownMenu data={dropdownMenuData} />
      </div>
      <hr className="my-2" />
      <DerivativeConfigName />
      <DerivativesConfigQuality />
      <DerivativeConfigDimensions />
      <DerivativesConfigAdvanced />
    </div>
  );
}

function DerivativeConfigName() {
  const { name } = useSelector((state: RootState) => state.present.derivativeConfig);
  const dispatch = useDispatch();

  return (
    <div className="flex text-xs flex-col gap-2">
      <Input
        defaultValue={name}
        onBlur={(e) => {
          if (e.target.value !== name) {
            dispatch(setConfigName(e.target.value));
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        className="text-xs border-none focus-visible:ring-0 p-0 text-muted-foreground"
      />
    </div>
  );
}
