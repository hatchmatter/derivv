import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@derivv/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@derivv/ui/components/collapsible"

import { DerivativesConfigFileType } from "@/components/derivatives-config/derivatives-config-filetype";
import { SectionTitle } from "../section-title";

export function DerivativesConfigAdvanced() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full mt-6"
    >
      <div className="flex items-center justify-between">
        <SectionTitle className="mt-0">Advanced Options</SectionTitle>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-transparent">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
            <span className="sr-only">Toggle Advanced Options</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <DerivativesConfigFileType />
      </CollapsibleContent>
    </Collapsible>
  )
}
