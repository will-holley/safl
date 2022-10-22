import { WebMidi } from "webmidi";
import type { Input } from "webmidi";

export default class Midi {
  _driver: any;
  _input: Input | null = null;

  constructor() {}

  get enabled() {
    return Boolean(this._input);
  }

  async enable(): Promise<Input> {
    // Return cached input
    if (this.enabled) this._input;

    await WebMidi.enable();

    this._driver = WebMidi;

    // Verify that midi drivers are connected
    if (this._driver.inputs.length === 0)
      throw new Error("No Midi Connections");

    // Search for OP1 input
    const input = this._driver.getInputByName("OP-1 Midi Device");

    // Verify that OP-1 was found
    if (!input) throw new Error("No OP-1 Midi connection");

    this._input = input;

    return this._input as Input;
  }
}
