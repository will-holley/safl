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
  // OP-1 uses 53-76 for E3 - F5
  number: number;
  // Key alignment
  alignRight?: boolean;
}> = ({ name, number, alignRight = false }) => {
  return (
    <>
      <Button alignRight={alignRight} buttonId={number}>
        {name.includes("#") ? <Black>{name}</Black> : name}
      </Button>
    </>
  );
};
