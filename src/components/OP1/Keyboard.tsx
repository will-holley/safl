import styled from "styled-components";

import { BlackKey, WhiteKey, BlackKeyWidth, KeyGroup } from "./Key";

const Layout = styled.div<{}>`
  display: grid;
  grid-template-columns: 268px 200px 268px 200px;
  grid-template-rows: var(--dim-unit-1) var(--dim-unit-3);
  grid-column-gap: 4px;
  grid-row-gap: 4px;

  background-color: var(--color-dark-gray);
  padding: 4px;
`;

const Keyboard: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <KeyGroup column={1} row={2}>
        <WhiteKey name="F" number={53} />
        <WhiteKey name="G" number={55} />
        <WhiteKey name="A" number={57} />
        <WhiteKey name="B" number={59} />
      </KeyGroup>
      <KeyGroup column={1} row={1}>
        <BlackKey name="F#" number={54} />
        <BlackKey name="G#" width={BlackKeyWidth.Short} number={56} />
        <BlackKey name="A#" number={58} />
      </KeyGroup>
      <KeyGroup column={2} row={2}>
        <WhiteKey name="C" number={60} />
        <WhiteKey name="D" number={62} />
        <WhiteKey name="E" number={64} />
      </KeyGroup>
      <KeyGroup column={2} row={1}>
        <BlackKey name="C#" number={61} />
        <BlackKey name="D#" number={63} />
      </KeyGroup>
      <KeyGroup column={3} row={2}>
        <WhiteKey name="F" number={65} />
        <WhiteKey name="G" number={67} />
        <WhiteKey name="A" number={69} />
        <WhiteKey name="B" number={71} />
      </KeyGroup>
      <KeyGroup column={3} row={1}>
        <BlackKey name="F#" number={66} />
        <BlackKey name="G#" width={BlackKeyWidth.Short} number={68} />
        <BlackKey name="A#" number={70} />
      </KeyGroup>
      <KeyGroup column={4} row={2}>
        <WhiteKey name="C" number={72} />
        <WhiteKey name="D" number={74} />
        <WhiteKey name="E" number={76} />
      </KeyGroup>
      <KeyGroup column={4} row={1}>
        <BlackKey name="C#" number={73} />
        <BlackKey name="D#" number={75} />
      </KeyGroup>
    </Layout>
  );
};

export default Keyboard;
