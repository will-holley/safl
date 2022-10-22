type PressedKeys = { [id: string]: boolean };

interface UIState {
  keys: PressedKeys;
}

export type { UIState, PressedKeys };
