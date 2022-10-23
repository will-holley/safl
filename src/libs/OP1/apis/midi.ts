import { WebMidi } from "webmidi";
import type {
  Input,
  NoteMessageEvent,
  ControlChangeMessageEvent,
} from "webmidi";
import type {
  onButtonDepress,
  onButtonRelease,
  onEncoderRotation,
} from "./../types";

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
  _handleControlRotationCallbacks: CallbackMap = {};

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
    const interactionValue = event.message.data[2];

    // Button Depress
    if (
      interactionValue === 127 &&
      this._handleControlChangeOnCallbacks[number]
    ) {
      this._handleControlChangeOnCallbacks[number].forEach((callback) =>
        callback()
      );

      // Button Release
    } else if (
      interactionValue === 0 &&
      this._handleControlChangeOffCallbacks[number]
    ) {
      this._handleControlChangeOffCallbacks[number].forEach((callback) =>
        callback()
      );
    } else if (this._handleControlRotationCallbacks[number]) {
      this._handleControlRotationCallbacks[number].forEach((callback) =>
        callback(interactionValue)
      );
    }
  }

  _addNoteCallbacks(
    buttonId: number,
    callbacks: {
      onDepress: onButtonDepress;
      onRelease: onButtonRelease;
    }
  ): void {
    // Initialize arrays if necessary
    if (!this._handleNoteOnCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOnCallbacks[buttonId] = [];
    if (!this._handleNoteOffCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOffCallbacks[buttonId] = [];
    // Add callbacks
    this._handleNoteOnCallbacks[buttonId].push(callbacks.onDepress);
    this._handleNoteOffCallbacks[buttonId].push(callbacks.onRelease);
  }

  _addControlChangeCallbacks(
    controlId: number,
    callbacks: {
      onDepress?: onButtonDepress;
      onRelease?: onButtonRelease;
      onRotation?: onEncoderRotation;
    }
  ): void {
    // Initialize arrays if necessary

    // Add callback
    if (callbacks.onDepress) {
      if (!this._handleControlChangeOnCallbacks.hasOwnProperty(controlId)) {
        this._handleControlChangeOnCallbacks[controlId] = [];
      }

      this._handleControlChangeOnCallbacks[controlId].push(callbacks.onDepress);
    }

    if (callbacks.onRelease) {
      if (!this._handleControlChangeOffCallbacks.hasOwnProperty(controlId)) {
        this._handleControlChangeOffCallbacks[controlId] = [];
      }

      this._handleControlChangeOffCallbacks[controlId].push(
        callbacks.onRelease
      );
    }

    if (callbacks.onRotation) {
      if (!this._handleControlRotationCallbacks.hasOwnProperty(controlId)) {
        this._handleControlRotationCallbacks[controlId] = [];
      }

      this._handleControlRotationCallbacks[controlId].push(
        callbacks.onRotation
      );
    }
  }
}
