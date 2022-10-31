import styled from "styled-components";

import Button from "../hardware/Button";

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
  // Key alignment
  alignRight?: boolean;
}> = ({ name, midiNoteNumber, alignRight = false }) => {
  const label = DEBUG_SHOW_MIDI_NUMBERS ? midiNoteNumber.toString() : name;
  return (
    <>
      <Button alignRight={alignRight} midiNumber={midiNoteNumber} isKey>
        {name.includes("#") ? <Black>{label}</Black> : label}
      </Button>
    </>
  );
};
