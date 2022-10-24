import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
  padding: 2rem;

  color: var(--cp-monochrome-text);
  font-weight: 300;

  width: fit-content;
  border: 1px solid var(--cp-monochrome-text);
`;

const ControlPanel: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ControlPanel;
