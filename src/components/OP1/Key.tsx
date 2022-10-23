import styled from "styled-components";
import useOP1 from "./context/useOP1";

const Key = styled.div<{ name: string; pressed: boolean }>`
  border-radius: var(--button-border-radius);
  background-color: var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    position: relative;
    content: "${({ name }) => name}";

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

    font-weight: 600;
  }
`;

const WhiteKeyEl = styled(Key)<{}>`
  height: var(--dim-key-white-height);
  width: var(--dim-key-white-width);

  &::after {
    color: ${({ pressed }) =>
      pressed ? "var(--color-orange)" : "var(--color-white)"};

    height: 110px;
    width: 42px;
    border-radius: 50px;

    background: var(--color-gray-cool);
    border: 1px solid var(--color-white);
  }
`;

export enum BlackKeyWidth {
  Short,
  Long,
}

const BlackKeyEl = styled(Key)<{ width?: BlackKeyWidth }>`
  height: var(--dim-key-black-height);
  width: var(
    --dim-key-black-${({ width }) => (width === BlackKeyWidth.Long ? "long" : "short")}-width
  );

  &::after {
    color: ${({ pressed }) =>
      pressed ? "var(--color-orange)" : "var(--color-dark-gray)"};

    height: 40px;
    width: 40px;

    background-color: var(--color-black);
    border: 2px solid var(--color-white);
    border-radius: 100%;
  }

  &:first-child::after {
    transform: translateX(16px);
  }
  &:last-child::after {
    transform: translateX(-16px);
  }
`;

export const KeyGroup = styled.div<{ column: number; row: number }>`
  display: flex;
  justify-content: space-between;
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
`;

interface KeyProps {
  // Key name e.g. F#
  name: string;
  // OP-1 uses 53-76 for E3 - F5
  number: number;
}

export const BlackKey: React.FC<KeyProps & { width?: BlackKeyWidth }> = ({
  name,
  number,
  width = BlackKeyWidth.Long,
}) => {
  const { keys } = useOP1();
  return <BlackKeyEl width={width} name={name} pressed={keys[number] == 1} />;
};

export const WhiteKey: React.FC<KeyProps> = ({ name, number }) => {
  const { keys } = useOP1();
  return <WhiteKeyEl name={name} pressed={keys[number] == 1} />;
};
