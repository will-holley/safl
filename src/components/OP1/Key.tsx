import styled from "styled-components";
import useOP1 from "../../libs/OP1/context/useOP1";

const Key = styled.div<{ id: string; pressed: boolean }>`
  border-radius: var(--button-border-radius);
  background-color: var(--color-gray);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WhiteKeyEl = styled(Key)<{}>`
  height: var(--dim-key-white-height);
  width: var(--dim-key-white-width);

  &::after {
    position: relative;
    content: "${({ id }) => id}";
    color: ${({ pressed }) =>
      pressed ? "var(--color-orange)" : "var(--color-white)"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;

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
    position: relative;

    content: "${({ id }) => id}";
    color: ${({ pressed }) =>
      pressed ? "var(--color-orange)" : "var(--color-dark-gray)"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

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

export const BlackKey: React.FC<{
  id: string;
  width?: BlackKeyWidth;
}> = ({ id, width = BlackKeyWidth.Long }) => {
  const { keys } = useOP1();
  return <BlackKeyEl width={width} id={id} pressed={keys[id]} />;
};

export const WhiteKey: React.FC<{
  id: string;
}> = ({ id }) => {
  const { keys } = useOP1();
  return <WhiteKeyEl id={id} pressed={keys[id]} />;
};
