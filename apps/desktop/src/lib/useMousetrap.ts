import mousetrap from "mousetrap";
import { useEffect, useRef } from "react";

/**
 * Use mousetrap hook
 *
 * @param  {(string | string[])} handlerKey - A key, key combo or array of combos according to Mousetrap documentation.
 * @param  { function } handlerCallback - A function that is triggered on key combo catch.
 * @param  { string } evtType - A string that specifies the type of event to listen for. It can be 'keypress', 'keydown' or 'keyup'.
 */
export function useMousetrap(
  handlerKey: string | string[],
  handlerCallback: (evt: any, combo: any) => void,
  evtType: string = "keydown"
): void {
  let actionRef = useRef<((evt: any, combo: any) => void) | null>(null);
  actionRef.current = handlerCallback;

  useEffect(() => {
    mousetrap.bind(handlerKey, (evt: any, combo: any) => {
      typeof actionRef.current === "function" && actionRef.current(evt, combo);
    }, evtType);
    return () => {
      mousetrap.unbind(handlerKey);
    };
  }, [handlerKey]);
};