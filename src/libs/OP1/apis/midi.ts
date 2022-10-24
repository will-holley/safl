import { WebMidi } from "webmidi";
import uuid4 from "uuid4";
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

// =================
// ===== TYPES =====
// =================

type DepressionCallbackMap = {
  [buttonId: number]: {
    [listenerId: string]: onButtonDepress;
  };
};

type ReleaseCallbackMap = {
  [buttonId: number]: {
    [listenerId: string]: onButtonRelease;
  };
};

type RotationCallbackMap = {
  [buttonId: number]: {
    [listenerId: string]: onEncoderRotation;
  };
};

// =================
// ===== CLASS =====
// =================

export default class Midi {
  _driver: any;
  _input: Input | null = null;

  // Callbacks
  _handleNoteOnCallbacks: DepressionCallbackMap = {};
  _handleNoteOffCallbacks: ReleaseCallbackMap = {};
  _handleControlChangeOnCallbacks: DepressionCallbackMap = {};
  _handleControlChangeOffCallbacks: ReleaseCallbackMap = {};
  _handleControlRotationCallbacks: RotationCallbackMap = {};

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

  /**
   * Triggers attached NoteOnCallbacks when a `noteon` is emitted.
   * @param event
   */
  _handleNoteOn(event: NoteMessageEvent): void {
    const number = event.note.number;
    if (this._handleNoteOnCallbacks[number]) {
      Object.values(this._handleNoteOnCallbacks[number]).forEach(
        (callback: onButtonDepress) => callback()
      );
    }
  }

  /**
   * Triggers attached NoteOffCallbacks when a `noteoff` is emitted.
   * @param event
   */
  _handleNoteOff(event: NoteMessageEvent): void {
    const number = event.note.number;
    if (this._handleNoteOffCallbacks[number]) {
      Object.values(this._handleNoteOffCallbacks[number]).forEach(
        (callback: onButtonRelease) => callback()
      );
    }
  }

  /**
   * Triggers attached encoder/button depression/release and encoder rotation callbacks
   * when a `controlchange` event is emitted.
   * @param event
   */
  _handleControlChange(event: ControlChangeMessageEvent): void {
    const number = event.controller.number;
    const interactionValue = event.message.data[2];

    // Button Depress
    if (
      interactionValue === 127 &&
      this._handleControlChangeOnCallbacks[number]
    ) {
      Object.values(this._handleControlChangeOnCallbacks[number]).forEach(
        (callback: onButtonDepress) => callback()
      );
    }
    // Button Release
    else if (
      interactionValue === 0 &&
      this._handleControlChangeOffCallbacks[number]
    ) {
      Object.values(this._handleControlChangeOffCallbacks[number]).forEach(
        (callback: onButtonRelease) => callback()
      );
    }
    // Encoder Rotation
    else if (this._handleControlRotationCallbacks[number]) {
      Object.values(this._handleControlRotationCallbacks[number]).forEach(
        (callback: onEncoderRotation) => callback(interactionValue)
      );
    }
  }

  /**
   * Adds callbacks that are triggered when a `noteon` or `noteoff` event is emitted.
   * @param buttonId
   * @param callbacks
   * @returns listenerId
   */
  _addNoteCallbacks(
    buttonId: number,
    callbacks: {
      onDepress: onButtonDepress;
      onRelease: onButtonRelease;
    }
  ): string {
    // The depression and release callbacks share a single listener id because they should always be managed
    // in unison e.g. removed together.
    const listenerId = uuid4();

    // Initialize arrays if necessary
    if (!this._handleNoteOnCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOnCallbacks[buttonId] = {};
    if (!this._handleNoteOffCallbacks.hasOwnProperty(buttonId))
      this._handleNoteOffCallbacks[buttonId] = {};
    // Add callbacks
    this._handleNoteOnCallbacks[buttonId][listenerId] = callbacks.onDepress;
    this._handleNoteOffCallbacks[buttonId][listenerId] = callbacks.onRelease;

    return listenerId;
  }

  _removeNoteCallback(controlId: number, listenerId: string): void {
    delete this._handleNoteOnCallbacks[controlId][listenerId];
    delete this._handleNoteOffCallbacks[controlId][listenerId];
  }

  /**
   * Adds callbacks that are triggered when a `controlchange` event is emitted.
   * @param controlId
   * @param callbacks
   * @returns listenerId
   */
  _addControlChangeCallbacks(
    controlId: number,
    callbacks: {
      onDepress?: onButtonDepress;
      onRelease?: onButtonRelease;
      onRotation?: onEncoderRotation;
    }
  ): string {
    const listenerId = uuid4();
    // Initialize arrays if necessary

    // Add callback
    if (callbacks.onDepress) {
      if (!this._handleControlChangeOnCallbacks.hasOwnProperty(controlId)) {
        this._handleControlChangeOnCallbacks[controlId] = {};
      }

      this._handleControlChangeOnCallbacks[controlId][listenerId] =
        callbacks.onDepress;
    }

    if (callbacks.onRelease) {
      if (!this._handleControlChangeOffCallbacks.hasOwnProperty(controlId)) {
        this._handleControlChangeOffCallbacks[controlId] = {};
      }

      this._handleControlChangeOffCallbacks[controlId][listenerId] =
        callbacks.onRelease;
    }

    if (callbacks.onRotation) {
      if (!this._handleControlRotationCallbacks.hasOwnProperty(controlId)) {
        this._handleControlRotationCallbacks[controlId] = {};
      }

      this._handleControlRotationCallbacks[controlId][listenerId] =
        callbacks.onRotation;
    }

    return listenerId;
  }

  _removeControlChangeCallback(controlId: number, listenerId: string): void {
    try {
      delete this._handleControlChangeOnCallbacks[controlId][listenerId];
      delete this._handleControlChangeOffCallbacks[controlId][listenerId];
    } catch (error) {
      // noop: Control had rotation, not depress/release callback assigned.
    }

    try {
      delete this._handleControlRotationCallbacks[controlId][listenerId];
    } catch (error) {
      // noop: Control had depress/release, not rotation callback assigned.
    }
  }
}
