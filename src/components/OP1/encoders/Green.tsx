import Encoder from "../hardware/Encoder";

const GreenEncoder: React.FC<{}> = ({}) => {
  return <Encoder startColumn={11} color="var(--cp-te-green)" controlId={2} />;
};

export default GreenEncoder;
