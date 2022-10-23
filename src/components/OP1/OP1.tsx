import OP1Provider from "./context/provider";

import Board from "./Board";
import Keyboard from "./Keyboard";
import ShiftButton from "./buttons/Shift";
import RewindButton from "./buttons/Rewind";
import ForwardButton from "./buttons/Forward";
import BlueEncoder from "./encoders/Blue";
import GreenEncoder from "./encoders/Green";
import WhiteEncoder from "./encoders/White";
import OrangeEncoder from "./encoders/Orange";

const OP1: React.FC<{}> = ({}) => {
  return (
    <OP1Provider>
      <Board>
        <>
          <BlueEncoder />
          <GreenEncoder />
          <WhiteEncoder />
          <OrangeEncoder />
        </>
        {/* <RewindButton />
        <ForwardButton />
        <ShiftButton /> */}
        <Keyboard />
      </Board>
    </OP1Provider>
  );
};

export default OP1;
