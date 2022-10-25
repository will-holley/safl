import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationMidiNumber } from "@T/op1";

const BlueEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={9}
      color="var(--cp-te-blue)"
      midiNumber={Op1EncoderRotationMidiNumber.BlueEncoder}
    />
  );
};

export default BlueEncoder;
