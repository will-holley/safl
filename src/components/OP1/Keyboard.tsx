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
      <KeyGroup column={1} row={1}>
        <BlackKey id="F#1" />
        <BlackKey id="G#1" width={BlackKeyWidth.Short} />
        <BlackKey id="A#1" />
      </KeyGroup>
      <KeyGroup column={2} row={1}>
        <BlackKey id="C#1" />
        <BlackKey id="D#1" />
      </KeyGroup>
      <KeyGroup column={3} row={1}>
        <BlackKey id="F#2" />
        <BlackKey id="G#2" width={BlackKeyWidth.Short} />
        <BlackKey id="A#2" />
      </KeyGroup>
      <KeyGroup column={4} row={1}>
        <BlackKey id="C#2" />
        <BlackKey id="D#2" />
      </KeyGroup>
      <KeyGroup column={1} row={2}>
        <WhiteKey id="F1" />
        <WhiteKey id="G1" />
        <WhiteKey id="A1" />
        <WhiteKey id="B1" />
      </KeyGroup>
      <KeyGroup column={2} row={2}>
        <WhiteKey id="C1" />
        <WhiteKey id="D1" />
        <WhiteKey id="E1" />
      </KeyGroup>
      <KeyGroup column={3} row={2}>
        <WhiteKey id="F2" />
        <WhiteKey id="G2" />
        <WhiteKey id="A2" />
        <WhiteKey id="B2" />
      </KeyGroup>
      <KeyGroup column={4} row={2}>
        <WhiteKey id="C2" />
        <WhiteKey id="D2" />
        <WhiteKey id="E2" />
      </KeyGroup>
    </Layout>
  );
};

export default Keyboard;
