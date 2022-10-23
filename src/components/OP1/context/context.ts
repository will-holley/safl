import { createContext } from "react";
import type { State } from "./types";

// Set up default state
export const defaultProviderState = {
  enabled: false,
  addPressListener: null,
  addRotationListener: null,
};

// Export
export const Context = createContext(defaultProviderState as State);
Context.displayName = "OP1Context";
