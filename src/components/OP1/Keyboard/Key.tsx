import styled from "styled-components";

import Button from "../hardware/Button";

import { ScaleDegree } from "@T/theory";

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
}> = ({ name, scaleDegree, midiNoteNumber, alignRight = false, enable }) => {
  return (
    <>
      <Button
        alignRight={alignRight}
        midiNumber={midiNoteNumber}
        isKey
        disabled={!enable}
      >
        {name.includes("#") || name.includes("b") ? (
          <Black>{name}</Black>
        ) : (
          name
        )}
      </Button>
    </>
  );
};
