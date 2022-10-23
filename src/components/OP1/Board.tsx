import styled from "styled-components";

/**
 * OP1 Case Specs
 * Length: 11.1" (282.0 mm)
 * Height: 4.0"  (102.0 mm)
 * Depth:  0.5"  (13.5 mm)
 */
const Board = styled.div`
  // Size & Layout

  // Board is split into 18 columns and 6 rows (108 cells).
  // Each cell is of equivalent sizing to a square button.

  width: fit-content;
  box-sizing: content-box;

  padding: var(--space-base-unit);

  display: grid;
  grid-template-rows: repeat(6, var(--space-primary-unit-sm));
  grid-template-columns: repeat(18, var(--space-primary-unit-sm));

  grid-column-gap: var(--button-gap);
  grid-row-gap: var(--button-gap);

  // Appearance

  background-color: var(--cp-monochrome-light);
  border-radius: 20px;
`;

export default Board;
