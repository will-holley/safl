import type { NextPage } from "next";

import MidiProvider, { Context as MidiContext } from "@components/OP1/midi";
import OP1 from "@components/OP1/OP1";
import { ScaleSelectorProvider } from "@components/ScaleSelector";
import MidiControlPanels from "@components/MidiControlPanels";
import { CalibrationProvider } from "@components/Calibration";

const Home: NextPage = () => {
  return (
    <div>
      <MidiProvider>
        <ScaleSelectorProvider>
          <CalibrationProvider>
            <OP1 />
            <MidiContext.Consumer>
              {({ enabled }) => enabled && <MidiControlPanels />}
            </MidiContext.Consumer>
          </CalibrationProvider>
        </ScaleSelectorProvider>
      </MidiProvider>
    </div>
  );
};

export default Home;
