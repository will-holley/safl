import Button from "../hardware/Button";
import LeftArrow from "../symbols/LeftArrow";

const RewindButton: React.FC<{}> = ({}) => {
  return (
    <Button column={1} row={6} buttonId={41}>
      <LeftArrow />
    </Button>
  );
};

export default RewindButton;
