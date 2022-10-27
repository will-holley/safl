import { createContext } from "react";
import { Scale } from "@tonaljs/tonal";
import type { ContextState } from "./types";
import reducer from "./reducer";

export const DEFAULT_STATE = {
  //@ts-ignore
  ...reducer({ enabled: false, rootNote: "C", scaleName: "major" }, {}),
  dispatch: () => {},
};

const Context = createContext(DEFAULT_STATE as ContextState);
Context.displayName = "ScaleSelectorContext";

export default Context;
