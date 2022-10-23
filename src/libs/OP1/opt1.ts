import Midi from "./apis/midi";
import Keyboard from "./apis/keyboard";

import type { OP1APIConfig } from "./types";

export default class OP1 {
  private _midi: Midi;
  private _keyboard: Keyboard;

  constructor(config: OP1APIConfig) {
    this._midi = new Midi();
    this._keyboard = new Keyboard(config.keys);
  }

  async connect() {
    const input = await this._midi.enable();
    this._keyboard.listenForMidiEvents(input);
  }
}
