import Context, { DEFAULT_STATE } from "./context";

import { useReducer } from "react";
import reducer from "./reducer";

import type { ContextState } from "./types";

const CalibrationProvider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <Context.Provider
      value={
        {
          ...state,
          dispatch,
        } as ContextState
      }
    >
      {children}
    </Context.Provider>
  );
};

export default CalibrationProvider;
