import styled from "styled-components";
import useOP1 from "../context/useOP1";

import Button from "../hardware/Button";

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
  // Key alignment
  alignRight?: boolean;
}> = ({ name, midiNoteNumber, alignRight = false }) => {
  return (
    <>
      <Button alignRight={alignRight} buttonId={midiNoteNumber} isKey>
        {name.includes("#") ? <Black>{name}</Black> : name}
      </Button>
    </>
  );
};
