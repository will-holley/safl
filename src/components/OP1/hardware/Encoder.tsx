import styled from "styled-components";

import { useEffect, useState } from "react";
import useMidi from "@components/OP1/midi/useMidi";
import { CallbackType, RotationDirection } from "../midi/types";

const Container = styled.div<{ startColumn: number }>`
  grid-column-start: ${({ startColumn }) => startColumn};
  grid-column-end: ${({ startColumn }) => startColumn + 2};
  grid-row-start: 1;
  grid-row-end: 3;

  background-color: var(--color-board);

  border: 1px solid var(--color-details);
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Base = styled.div`
  padding: var(--space-base-unit);
  border: 1px solid var(--color-details);
  border-radius: 100%;
  position: relative;

  &::before {
    content: "";
    border: 1px solid var(--color-details);
    height: 100%;
    width: 100%;
    position: absolute;
    inset: -4px;
    padding: 3px;
    border-radius: 100%;
  }
`;

const Knob = styled.div<{ color: string; rotation: number }>`
  height: 40px;
  width: 40px;
  background-color: ${({ color }) => color};
  border-radius: 100%;
  border: 1px solid var(--color-details);
  position: relative;

  &::after {
    content: "";
    background-color: var(--color-board);
    height: 85%;
    width: 33%;
    position: absolute;
    inset: 0;
    margin: auto;
    border-radius: 50px;
    transform: rotate(${({ rotation }) => rotation}deg);
  }
`;

// Each turn of the Encoder is equivalent to ~11.5 degrees of rotation.
// When the physical Encoders' indents are vertically aligned, the virtualized Encoders
// should replicate their position with close-to-perfect precision.
const DEG_PER_ROTATION = 11.5;

const Encoder: React.FC<{
  startColumn: number;
  color: string;
  monochromatic?: boolean;
  midiNumber: number;
}> = ({ startColumn, color, monochromatic = false, midiNumber }) => {
  const midi = useMidi();

  const [rotation, setRotation] = useState<number>(0);

  // Set up a press listener
  useEffect(() => {
    // Wait for OP1
    if (!midi.enabled) return;

    midi.addCallback(
      midiNumber,
      (direction: RotationDirection) => {
        setRotation((rotation) => rotation + direction * DEG_PER_ROTATION);
      },
      CallbackType.EncoderRotation
    );
  }, [midi.enabled, midi, midiNumber]);

  return (
    <Container startColumn={startColumn}>
      <Base>
        <Knob
          color={monochromatic ? "var(--color-details)" : color}
          rotation={rotation}
        />
      </Base>
    </Container>
  );
};

export default Encoder;
