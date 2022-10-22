import type { Note as WebMidiNote } from "webmidi";

interface Note extends WebMidiNote {
  // UUID for note made up of note name, accidental (if given) and octave.
  id: string;
}

type onNoteDown = (note: Note) => void;

type onNoteUp = (note: Note) => void;

export type { onNoteDown, onNoteUp, Note };
