import Midi from "./apis/midi";
import type {
  onButtonDepress,
  onButtonRelease,
  onEncoderRotation,
} from "./types";
import { ButtonType } from "./types";

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
   * @param buttonId Midi number for button.
   * @param onDepress Callback to be triggered when button is depressed.
   * @param onRelease Callback to be triggered when button is released.
   * @param buttonType Is button a key or a control? Button ids are not unique;
   * a key and a control can have the same midi number (e.g. depressing Blue Encoder
   * emits `64` as does pressing the `E4` key.)
   */
  addPressListener(
    buttonId: number,
    onDepress: onButtonDepress,
    onRelease: onButtonRelease,
    buttonType: ButtonType
  ): string {
    const adder =
      buttonType === ButtonType.Key
        ? this._midi._addNoteCallbacks
        : this._midi._addControlChangeCallbacks;

    return adder.call(this._midi, buttonId, { onDepress, onRelease });
  }

  removePressListener(
    controlId: number,
    listenerId: string,
    buttonType: ButtonType
  ): void {
    const remover =
      buttonType === ButtonType.Key
        ? this._midi._removeNoteCallback
        : this._midi._removeControlChangeCallback;
    remover.call(this._midi, controlId, listenerId);
  }

  /**
   * Listen for encoder rotation events.
   */
  addRotationListener(
    controlId: number,
    onRotation: onEncoderRotation
  ): string {
    // Validate that control is an encoder.
    if (controlId < 1 || controlId > 4) throw new Error();

    return this._midi._addControlChangeCallbacks(controlId, { onRotation });
  }

  removeRotationListener(controlId: number, listenerId: string): void {
    this._midi._removeControlChangeCallback(controlId, listenerId);
  }
}
