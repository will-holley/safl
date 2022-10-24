import Encoder from "../hardware/Encoder";
import { Op1EncoderControlIds } from "../../../libs/OP1/constants";

const BlueEncoder: React.FC<{}> = ({}) => {
  return (
    <Encoder
      startColumn={9}
      color="var(--cp-te-blue)"
      controlId={Op1EncoderControlIds.BlueEncoder}
    />
  );
};

export default BlueEncoder;
