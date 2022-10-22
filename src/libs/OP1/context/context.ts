import { createContext } from "react";
import type { State } from "./types";
import { SUPPORTED_NOTES } from "../constants";

// Set up default state
export const defaultProviderState = {
  keys: SUPPORTED_NOTES.reduce(
    (memo, note) => ({ ...memo, [note]: false }),
    {}
  ),
};

// Export
export const Context = createContext(defaultProviderState as State);
Context.displayName = "OP1Context";
