import Button from "../hardware/Button";

const ForwardButton: React.FC<{}> = ({}) => {
  return (
    <Button column={2} row={6} buttonId={42}>
      Frwd
    </Button>
  );
};

export default ForwardButton;
