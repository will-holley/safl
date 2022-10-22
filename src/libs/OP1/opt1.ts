import Midi from "./apis/midi";
import Keyboard from "./apis/keyboard";

import type { onNoteDown, onNoteUp } from "./types";

export default class OP1 {
  private _midi: Midi;
  private _keyboard: Keyboard;

  constructor(config: {
    keys: { onNoteDown: onNoteDown; onNoteUp: onNoteUp };
  }) {
    this._midi = new Midi();
    this._keyboard = new Keyboard(config.keys);
  }

  async connect() {
    const input = await this._midi.enable();
    this._keyboard.listenForMidiEvents(input);
  }
}
