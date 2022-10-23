import { WebMidi } from "webmidi";
import type {
  Input,
  NoteMessageEvent,
  ControlChangeMessageEvent,
} from "webmidi";
import type { onButtonDepress, onButtonRelease } from "./../types";

type CallbackMap = {
  [buttonId: number]: Array<CallableFunction>;
};

export default class Midi {
  _driver: any;
  _input: Input | null = null;

  // Callbacks
  _handleNoteOnCallbacks: CallbackMap = {};
  _handleNoteOffCallbacks: CallbackMap = {};
  _handleControlChangeOnCallbacks: CallbackMap = {};
  _handleControlChangeOffCallbacks: CallbackMap = {};

  get enabled() {
    return Boolean(this._input);
  }

  async enable(): Promise<void> {
    if (this.enabled) return;

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

    this._registerEventListeners();
  }

  /**
   * Registers listeners for Note On/Off & Control Changes.
   */
  _registerEventListeners(): void {
    // Validate that method is not called prior to input assignment.
    if (!this.enabled) throw new Error();

    this._input?.addListener("noteon", (event: NoteMessageEvent) =>
      this._handleNoteOn.call(this, event)
    );

    this._input?.addListener("noteoff", (event: NoteMessageEvent) =>
      this._handleNoteOff.call(this, event)
    );

    this._input?.addListener(
      "controlchange",
      (event: ControlChangeMessageEvent) =>
        this._handleControlChange.call(this, event)
    );
  }

  _handleNoteOn(event: NoteMessageEvent): void {
    const number = event.note.number;
    if (this._handleNoteOnCallbacks[number]) {
      this._handleNoteOnCallbacks[number].forEach((callback) => callback());
    }
  }

  _handleNoteOff(event: NoteMessageEvent): void {
    const number = event.note.number;
    if (this._handleNoteOffCallbacks[number]) {
      this._handleNoteOffCallbacks[number].forEach((callback) => callback());
    }
  }

  _handleControlChange(event: ControlChangeMessageEvent): void {
    const number = event.controller.number;

    // Depressed or released?
    const action = event.message.data[2];

    if (action === 127 && this._handleControlChangeOnCallbacks[number]) {
      this._handleControlChangeOnCallbacks[number].forEach((callback) =>
        callback()
      );
    } else if (action === 0 && this._handleControlChangeOffCallbacks[number]) {
      this._handleControlChangeOffCallbacks[number].forEach((callback) =>
        callback()
      );
    } else throw new Error();
  }

  _addNoteCallbacks(
    buttonId: number,
    onDepress: onButtonDepress,
    onRelease: onButtonRelease
  ): void {
    // Initialize arrays if necessary
    if (!this._handleNoteOnCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOnCallbacks[buttonId] = [];
    if (!this._handleNoteOffCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOffCallbacks[buttonId] = [];
    // Add callback
    this._handleNoteOnCallbacks[buttonId].push(onDepress);
    this._handleNoteOffCallbacks[buttonId].push(onRelease);
  }

  _addControlChangeCallbacks(
    buttonId: number,
    onDepress: onButtonDepress,
    onRelease: onButtonRelease
  ): void {
    // Initialize arrays if necessary
    if (!this._handleControlChangeOnCallbacks.hasOwnProperty(buttonId))
      this._handleControlChangeOnCallbacks[buttonId] = [];
    if (!this._handleControlChangeOffCallbacks.hasOwnProperty(buttonId))
      this._handleControlChangeOffCallbacks[buttonId] = [];
    // Add callback
    this._handleControlChangeOnCallbacks[buttonId].push(onDepress);
    this._handleControlChangeOffCallbacks[buttonId].push(onRelease);
  }
}
