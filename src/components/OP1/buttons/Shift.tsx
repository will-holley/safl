import Button from "../hardware/Button";

const ShiftButton: React.FC<{}> = ({}) => {
  return (
    <Button column={3} row={6} midiNumber={-1}>
      Shift
    </Button>
  );
};

export default ShiftButton;
