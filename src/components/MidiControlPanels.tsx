// Components
import ScaleSelector from "@components/ScaleSelector";
import ControlPanel from "@components/ControlPanel";

// Libs
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 6fr);
`;

const MidiControlPanels: React.FC<{}> = ({}) => {
  return (
    <Container>
      <ControlPanel>
        <ScaleSelector />
      </ControlPanel>
    </Container>
  );
};

export default MidiControlPanels;
