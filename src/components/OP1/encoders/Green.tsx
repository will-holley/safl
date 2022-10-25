import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationControlIds } from "@T/op1";

const GreenEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={11}
      color="var(--cp-te-green)"
      controlId={Op1EncoderRotationControlIds.GreenEncoder}
    />
  );
};

export default GreenEncoder;
