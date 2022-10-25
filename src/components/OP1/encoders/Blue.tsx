import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationControlIds } from "@T/op1";

const BlueEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={9}
      color="var(--cp-te-blue)"
      controlId={Op1EncoderRotationControlIds.BlueEncoder}
    />
  );
};

export default BlueEncoder;
