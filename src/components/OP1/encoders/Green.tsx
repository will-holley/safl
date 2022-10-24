import Encoder from "../hardware/Encoder";
import { Op1EncoderControlIds } from "../../../libs/OP1/constants";

const GreenEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={11}
      color="var(--cp-te-green)"
      controlId={Op1EncoderControlIds.GreenEncoder}
    />
  );
};

export default GreenEncoder;
