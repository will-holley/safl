import { Context } from "./context";
import type { State } from "./types";

import { useEffect, useState } from "react";

import OP1 from "../../../libs/OP1/op1";

import { csr } from "../../../utils/browser";

const OP1Provider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  const [op1, setOP1] = useState<OP1>();

  /**
   * On initial client-side render.
   */
  const isClient = csr();
  useEffect(() => {
    async function setup() {
      const _op1 = new OP1();
      await _op1.connect();
      setOP1(_op1);
    }
    if (isClient && !op1) setup();
  }, [isClient, op1]);

  // STATE

  const enabled = op1?.enabled || false;
  const state = {
    enabled,
    addPressListener: enabled
      ? (...args) => op1?.addPressListener(...args)
      : null,
    removePressListener: enabled
      ? (...args) => op1?.removePressListener(...args)
      : null,
    addRotationListener: enabled
      ? (...args) => op1?.addRotationListener(...args)
      : null,
    removeRotationListener: enabled
      ? (...args) => op1?.removeRotationListener(...args)
      : null,
  } as State;

  // RENDER
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default OP1Provider;
