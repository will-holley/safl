import styled from "styled-components";

const SVG = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;

  transform-origin: 50% 50%;
  width: 100%;
  height: inherit;
`;

const Symbol: React.FC<{ D: string }> = ({ D }) => {
  return (
    <SVG viewBox="0 0 56.69 56.69">
      <path d={D} fill="var(--cp-monochrome-dark)" />
    </SVG>
  );
};

export default Symbol;
