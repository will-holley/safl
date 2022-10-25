export enum ButtonType {
  Control,
  Key,
}

// Midi Id of each Encoder sent for Rotation events.
export enum Op1EncoderRotationMidiNumber {
  BlueEncoder = 1,
  GreenEncoder = 2,
  WhiteEncoder = 3,
  OrangeEncoder = 4,
}

// Midi Id of each Encoder sent for Depress/Release events.
export enum Op1EncoderDepressMidiNumber {
  BlueEncoder = 64,
  GreenEncoder = 65,
  WhiteEncoder = 66,
  OrangeEncoder = 67,
}
