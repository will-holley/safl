import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationControlIds } from "../../../libs/OP1/constants";

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
