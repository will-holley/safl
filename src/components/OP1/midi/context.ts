import { createContext } from "react";
import type { State, Callback } from "./types";
import { CallbackType } from "./types";

const defaultState = {
  enabled: false,
  addCallback: (
    midiNumber: number,
    callback: Callback,
    callbackType: CallbackType
  ): string => {
    return "";
  },
  removeCallback: (
    midiNumber: number,
    callbackId: string,
    callbackType: CallbackType
  ): void => {},
};

const Context = createContext(defaultState as State);
Context.displayName = "MidiContext";

export default Context;
