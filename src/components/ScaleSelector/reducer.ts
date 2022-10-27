// Libs
import { Scale } from "@tonaljs/tonal";

// Types
import type { State, Action } from "./types";
import { ActionType } from "./types";

// Constants
import { SCALE_NAMES, NOTE_NAMES } from "@constants/theory";

export function addScaleToState(state: State): State {
  const scale = Scale.get(`${state.tonic} ${state.scaleName}`);
  state.notes = scale.notes;
  state.intervals = scale.intervals;
  return state;
}

// After reducer applies the specified action to state, run the new state
// through a set of transformers in order to annotate it with state-dependent
// information, such as the notes within the given scale.
const STATE_TRANSFORMERS = [addScaleToState];

function reducer(state: State, action: Action) {
  const newState = (() => {
    switch (action.type) {
      case ActionType.SwitchEnabled:
        return { ...state, enabled: !state.enabled };
      case ActionType.SetTonic: {
        return { ...state, tonic: action.value };
      }
      case ActionType.SetScale: {
        return { ...state, scaleName: action.value };
      }
      case ActionType.CycleTonic: {
        const index = NOTE_NAMES.indexOf(state.tonic);
        const nextIndex = index + action.direction;

        let nextTonic: string;
        if (nextIndex === NOTE_NAMES.length) {
          nextTonic = NOTE_NAMES[0];
        } else if (nextIndex === -1) {
          nextTonic = NOTE_NAMES[NOTE_NAMES.length - 1];
        } else {
          nextTonic = NOTE_NAMES[nextIndex];
        }

        return { ...state, tonic: nextTonic };
      }
      case ActionType.CycleScale: {
        const index = SCALE_NAMES.indexOf(state.scaleName);
        const nextIndex = index + action.direction;

        let nextScaleName: string;
        if (nextIndex === SCALE_NAMES.length) {
          nextScaleName = SCALE_NAMES[0];
        } else if (nextIndex === -1) {
          nextScaleName = SCALE_NAMES[SCALE_NAMES.length - 1];
        } else {
          nextScaleName = SCALE_NAMES[nextIndex];
        }

        return { ...state, scaleName: nextScaleName };
      }
      default: {
        return state;
      }
    }
  })();
  return STATE_TRANSFORMERS.reduce(
    (transformedState, transformer) => transformer(transformedState),
    newState
  );
}

export default reducer;
