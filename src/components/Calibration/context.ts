import { createContext } from "react";
import type { ContextState } from "./types";

export const DEFAULT_STATE = {
  octaveShift: 0,
  midiShift: 0,
};

const Context = createContext(DEFAULT_STATE as ContextState);
Context.displayName = "CalibrationContext";

export default Context;
