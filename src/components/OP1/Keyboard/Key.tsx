import styled from "styled-components";

import Button from "../hardware/Button";

import { ScaleDegree } from "@T/theory";

const DEBUG_SHOW_MIDI_NUMBERS = false;

const Black = styled.div`
  background-color: var(--cp-monochrome-dark);
  height: 100%;
  width: 100%;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--cp-monochrome-text);
`;

export const Key: React.FC<{
  // Key name e.g. F#
  name: string;
  // See: https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies
  midiNoteNumber: number;
  scaleDegree: ScaleDegree | null;
  // Key alignment
  alignRight?: boolean;
  enable?: boolean;
}> = ({ name, midiNoteNumber, alignRight = false, enable }) => {
  const label = DEBUG_SHOW_MIDI_NUMBERS ? midiNoteNumber.toString() : name;
  return (
    <>
      <Button
        alignRight={alignRight}
        midiNumber={midiNoteNumber}
        isKey
        disabled={!enable}
      >
        {name.includes("#") ? <Black>{label}</Black> : label}
      </Button>
    </>
  );
};
