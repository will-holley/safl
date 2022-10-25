/**
 * Callbacks reducer.  Unlike useState, deep updates populate through
 * Provider scope.
 */

// Types
import { CallbackType } from "./types";
import type {
  KeyDepressionCallbacks,
  KeyReleaseCallbacks,
  ControlDepressionCallbacks,
  ControlReleaseCallbacks,
  EncoderRotationCallbacks,
  Callback,
} from "./types";

export enum ActionType {
  Add = "ADD",
  Remove = "REMOVE",
}

interface BaseAction {
  type: ActionType;
  midiNumber: number;
  callbackId: string;
  callbackType: CallbackType;
}

interface AdditionAction extends BaseAction {
  callback: Callback;
}

interface RemovalAction extends BaseAction {}

type Action = AdditionAction | RemovalAction;

type State = {
  [CallbackType.KeyDepression]: KeyDepressionCallbacks;
  [CallbackType.KeyRelease]: KeyReleaseCallbacks;
  [CallbackType.ControlDepression]: ControlDepressionCallbacks;
  [CallbackType.ControlRelease]: ControlReleaseCallbacks;
  [CallbackType.EncoderRotation]: EncoderRotationCallbacks;
};

// STATE
export const initialState = {
  [CallbackType.KeyDepression]: {},
  [CallbackType.KeyRelease]: {},
  [CallbackType.ControlDepression]: {},
  [CallbackType.ControlRelease]: {},
  [CallbackType.EncoderRotation]: {},
};

export function reducer(state: State, action: Action): State {
  const { type, midiNumber, callbackId, callbackType } = action;
  switch (type) {
    case ActionType.Add: {
      // Initialize map
      if (!state[callbackType].hasOwnProperty(midiNumber)) {
        state[callbackType][midiNumber] = {};
      }
      state[callbackType][midiNumber][callbackId] = (
        action as AdditionAction
      ).callback;
      return state;
    }
    case ActionType.Remove: {
      delete state[callbackType][midiNumber][callbackId];
      return state;
    }
    default:
      return state;
  }
}
