import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationMidiNumber } from "@T/op1";

const OrangeEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={15}
      color="var(--cp-te-orange)"
      controlId={Op1EncoderRotationMidiNumber.OrangeEncoder}
    />
  );
};

export default OrangeEncoder;
