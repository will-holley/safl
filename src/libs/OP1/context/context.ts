import { createContext } from "react";
import type { UIState } from "./types";

const defaultUIState = {};
export const UIContext = createContext(defaultUIState as UIState);
UIContext.displayName = "UIContext";
