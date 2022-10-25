// Hooks
import { useReducer } from "react";

// Reducer
import reducer from "./reducer";

// State
import Context, { DEFAULT_STATE } from "./context";

// Types
import { ContextState } from "./types";

const ScaleSelectorProvider: React.FC<{
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

export default ScaleSelectorProvider;
