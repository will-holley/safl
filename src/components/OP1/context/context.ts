import { createContext } from "react";
import type { State, KeyState } from "./types";

// Set up default state
export const defaultProviderState = {
  keys: {
    53: 0,
    54: 0,
    55: 0,
    56: 0,
    57: 0,
    58: 0,
    59: 0,
    60: 0,
    61: 0,
    62: 0,
    63: 0,
    64: 0,
    65: 0,
    66: 0,
    67: 0,
    68: 0,
    69: 0,
    70: 0,
    71: 0,
    72: 0,
    73: 0,
    74: 0,
    75: 0,
    76: 0,
  } as KeyState,
};

// Export
export const Context = createContext(defaultProviderState as State);
Context.displayName = "OP1Context";
