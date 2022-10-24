import type { Note } from "webmidi";

type onNoteDown = (note: Note) => void;

type onNoteUp = (note: Note) => void;

export enum OctaveShift {
  Up,
  Down,
}

type onOctaveShift = (direction: OctaveShift) => void;

type onButtonDepress = () => void;
type onButtonRelease = () => void;

export enum ButtonType {
  Control,
  Key,
}

type ButtonPressListener = (
  buttonId: number,
  onDepress: onButtonDepress,
  onRelease: onButtonRelease,
  buttonType: ButtonType
) => string;

type ButtonPressRemoveListener = (
  controlId: number,
  listenerId: string,
  buttonType: ButtonType
) => void;

/**
 * value: 0-127.  Will continuously return 0 or 127 after exceeding these values.
 */
type onEncoderRotation = (value: number) => void;

type EncoderRotationListener = (
  controlId: number,
  onRotation: onEncoderRotation
) => string;

type EncoderRotationRemoveListener = (
  controlId: number,
  listenerId: string
) => void;

export type {
  onNoteDown,
  onNoteUp,
  onOctaveShift,
  onButtonDepress,
  onButtonRelease,
  ButtonPressListener,
  onEncoderRotation,
  EncoderRotationListener,
  ButtonPressRemoveListener,
  EncoderRotationRemoveListener,
};
