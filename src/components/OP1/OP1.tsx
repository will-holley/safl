import OP1Provider from "./context/provider";

import Case from "./Case";
import Keyboard from "./Keyboard";

const OP1: React.FC<{}> = ({}) => {
  return (
    <OP1Provider>
      <Case>
        <Keyboard />
      </Case>
    </OP1Provider>
  );
};

export default OP1;
