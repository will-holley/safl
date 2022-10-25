import type { NextPage } from "next";

import MidiProvider from "@components/OP1/midi/Provider";
import OP1 from "@components/OP1/OP1";
import {
  ScaleSelector,
  ScaleSelectorProvider,
} from "@components/ScaleSelector";
import ControlPanel from "@components/ControlPanel";

const Home: NextPage = () => {
  return (
    <div>
      <MidiProvider>
        <ScaleSelectorProvider>
          <OP1 />
          <ControlPanel>
            <ScaleSelector />
          </ControlPanel>
        </ScaleSelectorProvider>
      </MidiProvider>
    </div>
  );
};

export default Home;
