import Midi from "./apis/midi";
import type {
  onButtonDepress,
  onButtonRelease,
  onEncoderRotation,
} from "./types";

export default class OP1 {
  private _midi: Midi = new Midi();

  get enabled() {
    return this._midi.enabled;
  }

  async connect() {
    await this._midi.enable();
  }

  /**
   * Listen for button press events.
   */
  addPressListener(
    buttonId: number,
    onDepress: onButtonDepress,
    onRelease: onButtonRelease
  ): void {
    // If number is between 53-76, register Note On/Off.
    const adder =
      buttonId >= 53 && buttonId <= 76
        ? this._midi._addNoteCallbacks
        : // Otherwise, register control change.
          this._midi._addControlChangeCallbacks;

    adder.call(this._midi, buttonId, { onDepress, onRelease });
  }

  /**
   * Listen for encoder rotation events.
   */
  addRotationListener(controlId: number, onRotation: onEncoderRotation): void {
    // Validate that control is an encoder.
    if (controlId < 1 || controlId > 4) throw new Error();

    this._midi._addControlChangeCallbacks(controlId, { onRotation });
  }
}
