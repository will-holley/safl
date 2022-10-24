import Encoder from "../hardware/Encoder";
import { Op1EncoderControlIds } from "../../../libs/OP1/constants";

const OrangeEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={15}
      color="var(--cp-te-orange)"
      controlId={Op1EncoderControlIds.OrangeEncoder}
    />
  );
};

export default OrangeEncoder;
