import Encoder from "../hardware/Encoder";
import { Op1EncoderRotationControlIds } from "../../../libs/OP1/constants";

const OrangeEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={15}
      color="var(--cp-te-orange)"
      controlId={Op1EncoderRotationControlIds.OrangeEncoder}
    />
  );
};

export default OrangeEncoder;
