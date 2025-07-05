import { RotationDirection } from "@components/OP1/midi/types";

export interface State {
  enabled: boolean;
  tonic: string;
  scaleName: string;
  notes: Array<string>;
  intervals: Array<string>;
  chords: Array<string>;
}

export enum ActionType {
  SwitchEnabled = "SWITCH_ENABLED",
  SetTonic = "SET_ROOT_NOTE",
  SetScale = "SET_SCALE",
  CycleTonic = "CYCLE_ROOT_NOTE",
  CycleScale = "CYCLE_SCALE",
}

interface BaseAction {
  type: ActionType;
}

interface SwitchEnabledAction extends BaseAction {
  type: ActionType.SwitchEnabled;
}

interface SetTonicAction extends BaseAction {
  type: ActionType.SetTonic;
  value: string;
}

interface SetScaleAction extends BaseAction {
  type: ActionType.SetScale;
  value: string;
}

interface CycleTonicAction extends BaseAction {
  type: ActionType.CycleTonic;
  direction: RotationDirection;
}

interface CycleScaleAction extends BaseAction {
  type: ActionType.CycleScale;
  direction: RotationDirection;
}

export type Action =
  | SwitchEnabledAction
  | SetTonicAction
  | SetScaleAction
  | CycleTonicAction
  | CycleScaleAction;

export interface ContextState extends State {
  dispatch: React.Dispatch<Action>;
}
