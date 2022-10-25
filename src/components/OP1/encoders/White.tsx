import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationMidiNumber } from "@T/op1";

const WhiteEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={13}
      color="var(--cp-te-white)"
      controlId={Op1EncoderRotationMidiNumber.WhiteEncoder}
    />
  );
};

export default WhiteEncoder;
