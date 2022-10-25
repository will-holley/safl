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
  addCallback: AddCallback | null;
  removeCallback: RemoveCallback | null;
};

type KeyDepressionCallback = (note: Note) => void;
type KeyReleaseCallback = (note: Note) => void;
type ControlDepressionCallback = () => void;
type ControlReleaseCallback = () => void;
// value: 0-127.  Will continuously return 0 or 127 after exceeding these values.
type EncoderRotationCallback = (value: number) => void;

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
  KeyDepression,
  KeyRelease,
  ControlDepression,
  ControlRelease,
  EncoderRotation,
}
