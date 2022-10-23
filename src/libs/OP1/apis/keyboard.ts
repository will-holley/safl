import type {
  onNoteDown,
  onNoteUp,
  onOctaveShift,
  KeyboardAPIConfig,
} from "./../types";
import { OctaveShift } from "./../types";
import type {
  Input,
  NoteMessageEvent,
  ControlChangeMessageEvent,
} from "webmidi";

export default class Keyboard {
  _onNoteDownCallback: onNoteDown;
  _onNoteUpCallback: onNoteUp;
  _onOctaveShiftCallback: onOctaveShift;

  constructor(config: KeyboardAPIConfig) {
    this._onNoteDownCallback = config.onNoteDown;
    this._onNoteUpCallback = config.onNoteUp;
    this._onOctaveShiftCallback = config.onOctaveShift;
  }

  listenForMidiEvents(input: Input) {
    /**
     * Listen for key presses.
     */
    input.addListener("noteon", (event: NoteMessageEvent) => {
      this._onNoteDownCallback(event.note);
    });
    /**
     * Listen for key releases.
     */
    input.addListener("noteoff", (event: NoteMessageEvent) => {
      this._onNoteUpCallback(event.note);
    });
    /**
     * TODO:
     * Listen for octave shifts. NOTE: For octave shifts to be recognized,
     * OP-1 must be in "MIDI-CC" mode. After switching into Midi mode
     * (Shift + COM + 2), hold Shift and turn White knob. MIDI-CC mode ensures clicking the
     * arrows **does not** change the outputted midi notes and that they always stay
     * within 53 through 76
     */
    input.addListener("controlchange", (event: ControlChangeMessageEvent) => {
      const controllerId = event.controller.number;
      // Ignore non-octave shifts
      if (controllerId != 41 && controllerId != 42) return;

      this._onOctaveShiftCallback(OctaveShift.Up);
    });
  }
}
