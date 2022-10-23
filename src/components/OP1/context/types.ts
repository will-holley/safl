type KeyState = {
  // Fix false-negative type errors
  [number: number]: number;
  53: 0 | 1;
  54: 0 | 1;
  55: 0 | 1;
  56: 0 | 1;
  57: 0 | 1;
  58: 0 | 1;
  59: 0 | 1;
  60: 0 | 1;
  61: 0 | 1;
  62: 0 | 1;
  63: 0 | 1;
  64: 0 | 1;
  65: 0 | 1;
  66: 0 | 1;
  67: 0 | 1;
  68: 0 | 1;
  69: 0 | 1;
  70: 0 | 1;
  71: 0 | 1;
  72: 0 | 1;
  73: 0 | 1;
  74: 0 | 1;
  75: 0 | 1;
  76: 0 | 1;
};

interface State {
  keys: KeyState;
}

export type { State, KeyState };
