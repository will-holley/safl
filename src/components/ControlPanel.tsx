import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
  padding: 2rem;

  color: var(--cp-monochrome-text);
  font-weight: 300;

  width: fit-content;
  max-width: 660px;
  min-width: 600px;
  border: 1px solid var(--cp-monochrome-text);
`;

const Contents = styled.div`
  margin-top: 1rem;

  display: grid;
  grid-template-columns: repeat(3, 4fr);
  grid-template-rows: repeat(3, 4fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

const ControlPanel: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
  name: string;
}> = ({ children, name }) => {
  return (
    <Container>
      <strong>{name}</strong>
      <Contents>{children}</Contents>
    </Container>
  );
};

export default ControlPanel;
