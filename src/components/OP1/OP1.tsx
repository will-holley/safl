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
  );
};

export default OP1;
