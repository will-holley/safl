// Partial list of (note midi number, note name) tuples
// Full list: https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
const MIDI_NOTES = [
  [53, ["F"]],
  [54, ["F#", "Gb"]],
  [55, ["G"]],
  [56, ["G#", "Ab"]],
  [57, ["A"]],
  [58, ["A#", "Bb"]],
  [59, ["B"]],
  [60, ["C"]],
  [61, ["C#", "Db"]],
  [62, ["D"]],
  [63, ["D#", "Eb"]],
  [64, ["E"]],
  [65, ["F"]],
  [66, ["F#", "Gb"]],
  [67, ["G"]],
  [68, ["G#", "Ab"]],
  [69, ["A"]],
  [70, ["A#", "Bb"]],
  [71, ["B"]],
  [72, ["C"]],
  [73, ["C#", "Db"]],
  [74, ["D"]],
  [75, ["D#", "Eb"]],
  [76, ["E"]],
] as Array<[number, Array<string> | Array<[string, string]>]>;

export const BLACK_KEYS = MIDI_NOTES.filter(([midiValue, keyNames]) =>
  keyNames[0].includes("#")
);

export const WHITE_KEYS = MIDI_NOTES.filter(
  ([midiValue, keyNames]) => !keyNames[0].includes("#")
);
