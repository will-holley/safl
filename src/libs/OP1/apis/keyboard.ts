import type { onNoteDown, onNoteUp, Note } from "./../types";
import type { Input, NoteMessageEvent, Note as WebMidiNote } from "webmidi";

export default class Keyboard {
  _onNoteDownCallback: onNoteDown;
  _onNoteUpCallback: onNoteUp;

  constructor(config: { onNoteDown: onNoteDown; onNoteUp: onNoteUp }) {
    this._onNoteDownCallback = config.onNoteDown;
    this._onNoteUpCallback = config.onNoteUp;
  }

  /**
   * Adds id property to Note by combining name and octave.
   * @param note WebMidi note
   * @returns Note Deserialized Note
   */
  _deserializeNote(note: WebMidiNote): Note {
    // @ts-ignore
    note.id = `${note.name}${note.accidental || ""}${note.octave}`;
    return note as Note;
  }

  listenForMidiEvents(input: Input) {
    input.addListener("noteon", (event: NoteMessageEvent) =>
      this._onNoteDownCallback(this._deserializeNote(event.note))
    );
    input.addListener("noteoff", (event: NoteMessageEvent) =>
      this._onNoteUpCallback(this._deserializeNote(event.note))
    );
  }
}
