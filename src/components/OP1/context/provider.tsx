import { Context } from "./context";

import { useEffect, useState } from "react";

import OP1 from "../../../libs/OP1/op1";

import { csr } from "../../../utils/browser";

import type {
  onNoteDown,
  onNoteUp,
  onOctaveShift,
} from "../../../libs/OP1/types";
import { KeyState } from "./types";

import { defaultProviderState } from "./context";

const OP1Provider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  const [op1, setOP1] = useState<OP1>();

  const [keys, setKeys] = useState<KeyState>(defaultProviderState.keys);

  const onNoteDown: onNoteDown = (note) => {
    setKeys((state) => ({ ...state, [note.number]: 1 }));
  };

  const onNoteUp: onNoteUp = (note) => {
    setKeys((state) => ({ ...state, [note.number]: 0 }));
  };

  // TODO:
  const onOctaveShift: onOctaveShift = (direction) => {};

  /**
   * On initial client-side render.
   */
  const isClient = csr();
  useEffect(() => {
    async function setup() {
      const _op1 = new OP1({ keys: { onNoteDown, onNoteUp, onOctaveShift } });
      await _op1.connect();
      setOP1(_op1);
    }
    if (isClient && !op1) setup();
  }, [isClient, op1]);

  return <Context.Provider value={{ keys }}>{children}</Context.Provider>;
};

export default OP1Provider;
