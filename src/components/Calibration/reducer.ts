import type { State, Action } from "./types";
import { ActionType } from "./types";

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SetOctaveShift: {
      return {
        ...state,
        octaveShift: action.value,
        midiShift: 12 * action.value,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
