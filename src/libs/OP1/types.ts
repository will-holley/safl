import type { Note } from "webmidi";

type onNoteDown = (note: Note) => void;

type onNoteUp = (note: Note) => void;

export enum OctaveShift {
  Up,
  Down,
}

type onOctaveShift = (direction: OctaveShift) => void;

type OP1APIConfig = {
  keys: KeyboardAPIConfig;
};

type KeyboardAPIConfig = {
  onNoteDown: onNoteDown;
  onNoteUp: onNoteUp;
  onOctaveShift: onOctaveShift;
};

export type {
  onNoteDown,
  onNoteUp,
  onOctaveShift,
  KeyboardAPIConfig,
  OP1APIConfig,
};
