import { createContext } from "react";
import type { State } from "./types";

const defaultState = {
  enabled: false,
  addCallback: null,
  removeCallback: null,
};

const Context = createContext(defaultState as State);
Context.displayName = "MidiContext";

export default Context;
