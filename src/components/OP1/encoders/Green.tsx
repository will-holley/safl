import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationMidiNumber } from "@T/op1";

const GreenEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={11}
      color="var(--cp-te-green)"
      controlId={Op1EncoderRotationMidiNumber.GreenEncoder}
    />
  );
};

export default GreenEncoder;
