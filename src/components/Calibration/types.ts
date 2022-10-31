export interface State {
  octaveShift: number;
  midiShift: number;
}

export enum ActionType {
  SetOctaveShift = "SET_OCTAVE_SHIFT",
}

interface BaseAction {
  type: ActionType;
}

interface SetOctaveShiftAction extends BaseAction {
  type: ActionType.SetOctaveShift;
  value: number;
}

export type Action = SetOctaveShiftAction;

export interface ContextState extends State {
  dispatch: React.Dispatch<Action>;
}
