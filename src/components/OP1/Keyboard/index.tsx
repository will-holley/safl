import styled from "styled-components";

import { Key } from "./Key";

// Hooks
import { useScaleSelector } from "@components/ScaleSelector";
import { useCalibration } from "@components/Calibration";
import { useMemo } from "react";

import { BLACK_KEYS, WHITE_KEYS } from "@constants/keyboard";

import { ScaleDegree } from "@T/theory";

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

  // TODO: Do something w/ Intervals & Chords & Color
  console.log(scale);

  function scaleData(keyNames: Array<string>): {
    name: string;
    included: boolean;
    degree: null | ScaleDegree;
  } {
    let included = true;
    let degree = null;
    let name = keyNames[0]; // default to sharp
    if (scale.enabled) {
      if (scale.notes.includes(keyNames[0])) {
        // noop; include as sharp by default
      } else if (scale.notes.includes(keyNames[1])) {
        name = keyNames[1];
        included = true;
      } else {
        included = false;
      }

      // Determine degree
      if (included) {
        const index = scale.notes.indexOf(name);
        degree = ScaleDegree[index + 1] as unknown as ScaleDegree;
      }
    }

    return { name, included, degree };
  }

  return (
    <>
      <BlackKeys>
        {blackKeys.map(([midiNoteNumber, keyNames]: any, index) => {
          const sd = scaleData(keyNames);

          return (
            <Key
              key={`key-${midiNoteNumber}`}
              name={sd.name}
              midiNoteNumber={midiNoteNumber}
              scaleDegree={sd.degree}
              enable={sd.included}
              alignRight={[0, 3, 5, 8].includes(index)}
            />
          );
        })}
      </BlackKeys>
      <WhiteKeys>
        {whiteKeys.map(([midiNoteNumber, keyNames]: any) => {
          const sd = scaleData(keyNames);
          return (
            <Key
              key={`key-${midiNoteNumber}`}
              scaleDegree={sd.degree}
              name={sd.name}
              enable={sd.included}
              midiNoteNumber={midiNoteNumber}
            />
          );
        })}
      </WhiteKeys>
    </>
  );
};

export default Keyboard;
