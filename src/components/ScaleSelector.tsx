import { Scale } from "@tonaljs/tonal";
import { createContext, useState, useContext } from "react";
import styled from "styled-components";
import {
  EncoderDepressMapper,
  EncoderRotateMapper,
} from "./OP1/encoders/control_mapping";

// TYPES

type State = {
  enabled: boolean;
  scaleName: string;
  notes: Array<string>;
  rootNote: string;
  setRootNote: (rootNote: string) => void;
  setScale: (scaleName: string) => void;
  setEnabled: (enabled: boolean) => void;
};

// CONSTANTS

const SCALE_NAMES = Scale.names().sort();
const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "A", "A#", "B"];

// CONSTANTS: Initial Values

const DEFAULT_STATE = {
  enabled: false,
  scaleName: "major",
  notes: [],
  rootNote: "C",
  setRootNote: (rootNote: string) => {},
  setScale: (scaleName: string) => {},
  setEnabled: (enabled: boolean) => {},
};

// CONTEXT: Context
const Context = createContext(DEFAULT_STATE as State);

// CONTEXT: Hook
export const useScaleSelector = () => useContext(Context);

// CONTEXT: Provider
export const ScaleSelectorProvider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  const [enabled, setEnabled] = useState<boolean>(DEFAULT_STATE.enabled);
  const [scaleName, setScale] = useState<string>(DEFAULT_STATE.scaleName);
  const [rootNote, setRootNote] = useState<string>(DEFAULT_STATE.rootNote);
  const scale = Scale.get(`${rootNote} ${scaleName}`);

  return (
    <Context.Provider
      value={{
        enabled,
        setEnabled,
        scaleName,
        setScale,
        notes: scale.notes,
        rootNote,
        setRootNote,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// SELECTORS: UI Components

const Container = styled.div`
  width: 600px;
`;

const Layout = styled.div`
  margin-top: 1rem;

  display: grid;
  grid-template-columns: repeat(3, 4fr);
  grid-template-rows: repeat(3, 4fr);
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

// SELECTORS: Main Component
export const ScaleSelector: React.FC<{}> = ({}) => {
  const { scaleName, setScale, rootNote, setRootNote, enabled, setEnabled } =
    useScaleSelector();

  const handleChangeEnabled = () => setEnabled(!enabled);

  return (
    <Container>
      <strong>Scale</strong>
      <Layout>
        <label>Enabled</label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={handleChangeEnabled}
        />
        {/* <EncoderDepressMapper onDepress={handleChangeEnabled} /> */}
        <label>Scale</label>
        <select value={scaleName} onChange={(e) => setScale(e.target.value)}>
          <option>DISABLED</option>
          {SCALE_NAMES.map((name) => (
            <option key={`scale-${name}`}>{name}</option>
          ))}
        </select>
        {/* <EncoderRotateMapper
          onRotation={() => {
            console.log("SCALE ROTATED");
          }}
        /> */}
        <label>Root</label>
        <select value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
          {NOTE_NAMES.map((name) => (
            <option key={`note-${name}`}>{name}</option>
          ))}
        </select>
        {/* <EncoderRotateMapper
          onRotation={() => {
            console.log("ROOT NOTE ROTATED");
          }}
        /> */}
      </Layout>
    </Container>
  );
};
