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

type ButtonPressListener = (
  buttonId: number,
  onDepress: onButtonDepress,
  onRelease: onButtonRelease
) => void;

export type {
  onNoteDown,
  onNoteUp,
  onOctaveShift,
  onButtonDepress,
  onButtonRelease,
  ButtonPressListener,
};
