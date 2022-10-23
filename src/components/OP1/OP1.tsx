import OP1Provider from "./context/provider";

import Board from "./Board";
import Keyboard from "./Keyboard";
import ShiftButton from "./buttons/Shift";
import RewindButton from "./buttons/Rewind";
import ForwardButton from "./buttons/Forward";

const OP1: React.FC<{}> = ({}) => {
  return (
    <OP1Provider>
      <Board>
        {/* <RewindButton />
        <ForwardButton />
        <ShiftButton /> */}
        <Keyboard />
      </Board>
    </OP1Provider>
  );
};

export default OP1;
