// OP-1 ranges from F-1 through E9

const NOTES = ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"];

export const SUPPORTED_NOTES: Array<string> = [];

for (let octave = -1; octave <= 9; octave++) {
  NOTES.forEach((note) => SUPPORTED_NOTES.push(`${note}${octave}`));
}
