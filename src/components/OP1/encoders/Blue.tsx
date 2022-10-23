import Encoder from "../hardware/Encoder";

const BlueEncoder: React.FC<{}> = ({}) => {
  return <Encoder startColumn={9} color="var(--cp-te-blue)" controlId={1} />;
};

export default BlueEncoder;
