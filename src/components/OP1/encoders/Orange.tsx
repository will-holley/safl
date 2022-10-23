import Encoder from "../hardware/Encoder";

const OrangeEncoder: React.FC<{}> = ({}) => {
  return <Encoder startColumn={15} color="var(--cp-te-orange)" controlId={4} />;
};

export default OrangeEncoder;
