import { createContext } from "react";
import { Scale } from "@tonaljs/tonal";
import type { ContextState } from "./types";

export const DEFAULT_STATE = {
  enabled: false,
  rootNote: "C",
  scaleName: "major",
  notes: Scale.get("C major").notes,
  dispatch: () => {},
};

const Context = createContext(DEFAULT_STATE as ContextState);
Context.displayName = "ScaleSelectorContext";

export default Context;
