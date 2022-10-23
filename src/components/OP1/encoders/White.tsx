import Encoder from "../hardware/Encoder";

const WhiteEncoder: React.FC<{}> = ({}) => {
  return <Encoder startColumn={13} color="var(--cp-te-white)" controlId={3} />;
};

export default WhiteEncoder;
