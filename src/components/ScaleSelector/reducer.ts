// Libs
import { Scale } from "@tonaljs/tonal";

// Types
import type { State, Action } from "./types";
import { ActionType } from "./types";

// Constants
import { SCALE_NAMES, NOTE_NAMES } from "@constants/theory";

function getScale(rootNote: string, scaleName: string) {
  return Scale.get(`${rootNote} ${scaleName}`);
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.SwitchEnabled:
      return { ...state, enabled: !state.enabled };
    case ActionType.SetRootNote:
      return {
        ...state,
        rootNote: action.value,
        notes: getScale(action.value, state.scaleName).notes,
      };
    case ActionType.SetScale: {
      return {
        ...state,
        scaleName: action.value,
        notes: getScale(state.rootNote, action.value).notes,
      };
    }
    case ActionType.CycleRootNote: {
      const index = NOTE_NAMES.indexOf(state.rootNote);
      const nextIndex = index + action.direction;

      let nextRootNote: string;
      if (nextIndex === NOTE_NAMES.length) {
        nextRootNote = NOTE_NAMES[0];
      } else if (nextIndex === -1) {
        nextRootNote = NOTE_NAMES[NOTE_NAMES.length - 1];
      } else {
        nextRootNote = NOTE_NAMES[nextIndex];
      }

      return {
        ...state,
        rootNote: nextRootNote,
        notes: getScale(nextRootNote, state.scaleName).notes,
      };
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

      return {
        ...state,
        scaleName: nextScaleName,
        notes: getScale(state.rootNote, nextScaleName).notes,
      };
    }
    default:
      return state;
  }
}

export default reducer;
