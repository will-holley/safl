import type {
  ButtonPressListener,
  EncoderRotationListener,
} from "./../../../libs/OP1/types";

interface State {
  enabled: boolean;
  addPressListener: null | ButtonPressListener;
  addRotationListener: null | EncoderRotationListener;
}

export type { State };
