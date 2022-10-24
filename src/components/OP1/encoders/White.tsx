import Encoder from "../hardware/Encoder";
import { Op1EncoderControlIds } from "../../../libs/OP1/constants";

const WhiteEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={13}
      color="var(--cp-te-white)"
      controlId={Op1EncoderControlIds.WhiteEncoder}
    />
  );
};

export default WhiteEncoder;
