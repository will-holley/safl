import styled from "styled-components";

import { Key } from "./Key";

// Hooks
import { useScaleSelector } from "@components/ScaleSelector";
import { useCalibration } from "@components/Calibration";
import { useMemo } from "react";

import { BLACK_KEYS, WHITE_KEYS } from "../../../constants/keyboard";

const BlackKeys = styled.div`
  // Board Position
  grid-column-start: 4;
  grid-column-end: 18;
  grid-row-start: 4;
  grid-row-end: 5;

  // Inner Layout
  display: grid;
  grid-template-columns: repeat(
    2,
    var(--space-primary-unit-md) var(--space-primary-unit-sm)
      var(--space-primary-unit-md) var(--space-primary-unit-md)
      var(--space-primary-unit-md)
  );
  grid-template-rows: auto;

  column-gap: var(--button-gap);
`;

const WhiteKeys = styled.div`
  // Board Position
  grid-column-start: 4;
  grid-column-end: 18;
  grid-row-start: 5;
  grid-row-end: 7;

  // Inner Layout
  display: grid;
  grid-template-columns: repeat(14, auto);
  grid-template-rows: auto;

  column-gap: var(--button-gap);
`;

const Keyboard: React.FC<{}> = ({}) => {
  const scale = useScaleSelector();
  const { midiShift } = useCalibration();

  // Shift midi numbers to sync w/ OP-1's current octave transposition.
  const [blackKeys, whiteKeys] = useMemo(
    () => [
      BLACK_KEYS.map(([number, name]) => [(number += midiShift), name]),
      WHITE_KEYS.map(([number, name]) => [(number += midiShift), name]),
    ],
    [midiShift]
  );

  return (
    <>
      <BlackKeys>
        {blackKeys.map(([midiNoteNumber, keyName]: any, index) => (
          <Key
            key={`key-${midiNoteNumber}`}
            name={keyName}
            midiNoteNumber={
              scale.enabled && !scale.notes.includes(keyName)
                ? -1
                : midiNoteNumber
            }
            alignRight={[0, 3, 5, 8].includes(index)}
          />
        ))}
      </BlackKeys>
      <WhiteKeys>
        {whiteKeys.map(([midiNoteNumber, keyName]: any) => (
          <Key
            key={`key-${midiNoteNumber}`}
            name={keyName}
            midiNoteNumber={
              scale.enabled && !scale.notes.includes(keyName)
                ? -1
                : midiNoteNumber
            }
          />
        ))}
      </WhiteKeys>
    </>
  );
};

export default Keyboard;
