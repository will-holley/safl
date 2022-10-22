import styled from "styled-components";

import { millimetersToPixels } from "../../utils/measurement";

/**
 * OP1 Case Specs
 * Length: 11.1" (282.0 mm)
 * Height: 4.0"  (102.0 mm)
 * Depth:  0.5"  (13.5 mm)
 */
const Case = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: var(--dim-case-width);
  height: var(--dim-case-height);

  background-color: var(--color-gray);
  background: linear-gradient(
    107.83deg,
    var(--color-gray-cool) 1.91%,
    var(--color-gray) 97.76%
  );
  box-sizing: border-box;
  //box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.8);
  border-radius: 20px;
`;

export default Case;
