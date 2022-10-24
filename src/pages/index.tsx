import type { NextPage } from "next";

import OP1Provider from "../components/OP1/context/provider";
import OP1 from "../components/OP1/OP1";
import {
  ScaleSelector,
  ScaleSelectorProvider,
} from "../components/ScaleSelector";
import ControlPanel from "../components/ControlPanel";

const Home: NextPage = () => {
  return (
    <div>
      <OP1Provider>
        <ScaleSelectorProvider>
          <OP1 />
          <ControlPanel>
            <ScaleSelector />
          </ControlPanel>
        </ScaleSelectorProvider>
      </OP1Provider>
    </div>
  );
};

export default Home;
