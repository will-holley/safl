import type { ButtonPressListener } from "./../../../libs/OP1/types";

interface State {
  enabled: boolean;
  listen: null | ButtonPressListener;
}

export type { State };
