import { RotationDirection } from "@components/OP1/midi/types";

export interface State {
  enabled: boolean;
  rootNote: string;
  scaleName: string;
  notes: Array<string>;
}

export enum ActionType {
  SwitchEnabled = "SWITCH_ENABLED",
  SetRootNote = "SET_ROOT_NOTE",
  SetScale = "SET_SCALE",
  CycleRootNote = "CYCLE_ROOT_NOTE",
  CycleScale = "CYCLE_SCALE",
}

interface BaseAction {
  type: ActionType;
}

interface SwitchEnabledAction extends BaseAction {
  type: ActionType.SwitchEnabled;
}

interface SetRootNoteAction extends BaseAction {
  type: ActionType.SetRootNote;
  value: string;
}

interface SetScaleAction extends BaseAction {
  type: ActionType.SetScale;
  value: string;
}

interface CycleRootNoteAction extends BaseAction {
  type: ActionType.CycleRootNote;
  direction: RotationDirection;
}

interface CycleScaleAction extends BaseAction {
  type: ActionType.CycleScale;
  direction: RotationDirection;
}

export type Action =
  | SwitchEnabledAction
  | SetRootNoteAction
  | SetScaleAction
  | CycleRootNoteAction
  | CycleScaleAction;

export interface ContextState extends State {
  dispatch: React.Dispatch<Action>;
}
