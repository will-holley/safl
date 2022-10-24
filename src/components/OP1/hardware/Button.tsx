import styled from "styled-components";

import { useEffect, useState } from "react";
import useOP1 from "../context/useOP1";
import { ButtonType } from "../../../libs/OP1/types";

const Container = styled.div<{
  column: number | null;
  row: number | null;
  alignRight: boolean;
  disabled: boolean;
}>`
  // Expand to fit cell as defined by parent grid.
  height: 100%;
  width: 100%;

  background-color: var(--color-board);

  border: 1px solid var(--color-details);
  border-radius: 6px;

  padding: 1px;

  // Optional: Where to position within grid board
  ${({ column, row }) =>
    column &&
    row &&
    `
    grid-column: ${column};
    grid-row: ${row};
  `}

  ${({ alignRight }) =>
    alignRight &&
    `
    display: flex;
    justify-content: flex-end;
  `}

  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};

  cursor: default;
`;

const OuterBorder = styled.div<{ pressed: boolean }>`
  height: 100%;
  width: calc(var(--space-primary-unit-sm) - 4px);

  border: 1px solid var(--color-details);
  border-radius: 50px;

  padding: 8px;

  transition: ease-in-out 0.075s background-color;
  background-color: ${({ pressed }) =>
    pressed ? "var(--color-btn-press-feedback)" : "transparent"};
`;

const InnerBorder = styled.div<{ pressed: boolean }>`
  height: 100%;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-color: var(--color-details);
  border-radius: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-board);

  // TODO: Use Univers Next (https://www.qbn.com/topics/688428/) font.

  font-size: 10px;
  font-weight: 300;

  color: ${({ pressed }) =>
    pressed ? "var(--color-btn-press-feedback)" : "inherit"};

  position: relative;
`;

const Button: React.FC<{
  // Content, such as text or child element, to render within button.
  children?: React.ReactElement | string;
  // Optional: Column within Board Grid
  column?: number;
  // Optional: Row within Board Grid
  row?: number;
  // Optional: Align content to the right of container; necessary to
  // properly align black keys.
  alignRight?: boolean;
  // Midi button id
  buttonId: number;
  // Optional: Is button a keyboard key?
  isKey?: boolean;
}> = ({
  children,
  column = null,
  row = null,
  alignRight = false,
  buttonId,
  isKey = false,
}) => {
  const op1 = useOP1();
  const [pressed, setPressed] = useState<boolean>(false);

  // Set up a press listener
  useEffect(() => {
    // Wait for OP1
    if (!op1.enabled) return;

    //@ts-ignore
    op1.addPressListener(
      buttonId,
      () => setPressed(true),
      () => setPressed(false),
      isKey ? ButtonType.Key : ButtonType.Control
    );
  }, [op1.enabled, op1.addPressListener]);

  // RENDER

  // Some buttons may not provide Midi output, such as SHIFT and therefore are "disabled"
  // and should indicate this visually.
  const isDisabled = buttonId === -1;

  return (
    <Container
      column={column}
      row={row}
      alignRight={alignRight}
      disabled={isDisabled}
    >
      <OuterBorder pressed={pressed}>
        <InnerBorder pressed={pressed}>{children}</InnerBorder>
      </OuterBorder>
    </Container>
  );
};

export default Button;
