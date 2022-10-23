import OP1Provider from "./context/provider";

import Board from "./Board";
import Keyboard from "./Keyboard";
import ShiftButton from "./buttons/Shift";

const OP1: React.FC<{}> = ({}) => {
  return (
    <OP1Provider>
      <Board>
        <ShiftButton />
        <Keyboard />
      </Board>
    </OP1Provider>
  );
};

export default OP1;
