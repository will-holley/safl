import type { NextPage } from "next";

import MidiProvider, { Context as MidiContext } from "@components/OP1/midi";
import OP1 from "@components/OP1/OP1";
import ScaleSelector, {
  ScaleSelectorProvider,
} from "@components/ScaleSelector";
import ControlPanel from "@components/ControlPanel";

const Home: NextPage = () => {
  return (
    <div>
      <MidiProvider>
        <ScaleSelectorProvider>
          <OP1 />
          <MidiContext.Consumer>
            {({ enabled }) =>
              enabled && (
                <ControlPanel>
                  <ScaleSelector />
                </ControlPanel>
              )
            }
          </MidiContext.Consumer>
        </ScaleSelectorProvider>
      </MidiProvider>
    </div>
  );
};

export default Home;
