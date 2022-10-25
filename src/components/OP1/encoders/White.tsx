import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationControlIds } from "@T/op1";

const WhiteEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={13}
      color="var(--cp-te-white)"
      controlId={Op1EncoderRotationControlIds.WhiteEncoder}
    />
  );
};

export default WhiteEncoder;
