import styled from "styled-components";

import { BlackKey, WhiteKey, BlackKeyWidth, KeyGroup, Key } from "./Key";

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
  return (
    <>
      <BlackKeys>
        <Key name="F#" number={54} alignRight />
        <Key name="G#" number={56} />
        <Key name="A#" number={58} />
        <Key name="C#" number={61} alignRight />
        <Key name="D#" number={63} />
        <Key name="F#" number={66} alignRight />
        <Key name="G#" number={68} />
        <Key name="A#" number={70} />
        <Key name="C#" number={73} alignRight />
        <Key name="D#" number={75} />
      </BlackKeys>
      <WhiteKeys>
        <Key name="F" number={53} />
        <Key name="G" number={55} />
        <Key name="A" number={57} />
        <Key name="B" number={59} />
        <Key name="C" number={60} />
        <Key name="D" number={62} />
        <Key name="E" number={64} />
        <Key name="F" number={65} />
        <Key name="G" number={67} />
        <Key name="A" number={69} />
        <Key name="B" number={71} />
        <Key name="C" number={72} />
        <Key name="D" number={74} />
        <Key name="E" number={76} />
      </WhiteKeys>
    </>
  );
};

export default Keyboard;
