import type {
  ButtonPressListener,
  EncoderRotationListener,
  ButtonPressRemoveListener,
  EncoderRotationRemoveListener,
} from "@libs/OP1/types";

interface State {
  enabled: boolean;
  addPressListener: null | ButtonPressListener;
  removePressListener: null | ButtonPressRemoveListener;
  addRotationListener: null | EncoderRotationListener;
  removeRotationListener: null | EncoderRotationRemoveListener;
}

export type { State };
