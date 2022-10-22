import { UIContext } from "./context";

import { useEffect, useState } from "react";

import OP1 from "../opt1";

import { csr } from "../../../utils/browser";

import type { onNoteDown, onNoteUp } from "./../types";
import { PressedKeys } from "./types";

const OP1Provider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  const [op1, setOP1] = useState<OP1>();

  const [pressedKeys, setPressedKeys] = useState<PressedKeys>({});

  const onNoteDown: onNoteDown = (note) => {
    setPressedKeys((prevState) => ({ ...prevState, [note.id]: true }));
  };
  const onNoteUp: onNoteUp = (note) => {
    setPressedKeys((prevState) => ({ ...prevState, [note.id]: false }));
  };

  /**
   * On initial client-side render.
   */
  const isClient = csr();
  useEffect(() => {
    async function setup() {
      const _op1 = new OP1({ keys: { onNoteDown, onNoteUp } });
      await _op1.connect();
      setOP1(_op1);
    }
    if (isClient && !op1) setup();
  }, [isClient, op1]);

  return (
    <UIContext.Provider value={{ keys: pressedKeys }}>
      {children}
    </UIContext.Provider>
  );
};

export default OP1Provider;
