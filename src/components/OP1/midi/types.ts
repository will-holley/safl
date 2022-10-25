import type { Note } from "webmidi";

type MidiNumber = number;

type AddCallback = (
  midiNumber: number,
  callback: Callback,
  callbackType: CallbackType
) => string;

type RemoveCallback = (
  midiNumber: MidiNumber,
  callbackId: string,
  callbackType: CallbackType
) => void;

export type State = {
  enabled: boolean;
  addCallback: AddCallback;
  removeCallback: RemoveCallback;
};

export type KeyDepressionCallback = (note: Note) => void;
export type KeyReleaseCallback = (note: Note) => void;
export type ControlDepressionCallback = () => void;
export type ControlReleaseCallback = () => void;
// value: 0-127.  Will continuously return 0 or 127 after exceeding these values.
export type EncoderRotationCallback = (value: number) => void;

export type Callback =
  | KeyDepressionCallback
  | KeyReleaseCallback
  | ControlDepressionCallback
  | ControlReleaseCallback
  | EncoderRotationCallback;

export type KeyDepressionCallbacks = {
  [midiNumber: MidiNumber]: {
    [callbackId: string]: KeyDepressionCallback;
  };
};

export type KeyReleaseCallbacks = {
  [midiNumber: MidiNumber]: {
    [callbackId: string]: KeyReleaseCallback;
  };
};

export type ControlDepressionCallbacks = {
  [midiNumber: MidiNumber]: {
    [callbackId: string]: ControlDepressionCallback;
  };
};

export type ControlReleaseCallbacks = {
  [midiNumber: MidiNumber]: {
    [callbackId: string]: ControlReleaseCallback;
  };
};

export type EncoderRotationCallbacks = {
  [midiNumber: MidiNumber]: {
    [callbackId: string]: EncoderRotationCallback;
  };
};

export type CallbacksMap =
  | KeyDepressionCallbacks
  | KeyReleaseCallbacks
  | ControlDepressionCallbacks
  | ControlReleaseCallbacks
  | EncoderRotationCallbacks;

export enum CallbackType {
  KeyDepression = "KEY_DEPRESSION",
  KeyRelease = "KEY_RELEASE",
  ControlDepression = "CONTROL_DEPRESSION",
  ControlRelease = "CONTROL_RELEASE",
  EncoderRotation = "ENCODER_ROTATION",
}
