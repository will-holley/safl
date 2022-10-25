// Utils
import React, { cloneElement } from "react";
import styled from "styled-components";

// Hooks
import useMidi from "@components/OP1/midi/useMidi";
import { useState } from "react";

// Constants
import {
  Op1EncoderRotationMidiNumber,
  Op1EncoderDepressMidiNumber,
} from "@T/op1";

// Types

type MidiNumbers = Op1EncoderRotationMidiNumber | Op1EncoderDepressMidiNumber;

const Button = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const GenericMapper: React.FC<{
  children: React.ReactElement;
  midiNumbers: MidiNumbers;
  addListener: (midiNumber: number) => string;
  removeListener: (midiNumber: number, callbackId: string) => void;
}> = ({
  // Icon to display
  children,
  midiNumbers,
  addListener,
  removeListener,
}) => {
  // CONSTANTS
  const ORDERED_ENCODER_VALUES = [
    null,
    midiNumbers.BlueEncoder,
    midiNumbers.GreenEncoder,
    midiNumbers.WhiteEncoder,
    midiNumbers.OrangeEncoder,
  ];

  // HOOKS

  const midi = useMidi();

  // STATE

  const [midiNumber, setMidiNumber] = useState<number | null>(null);
  const [callbackId, setCallbackId] = useState<string | null>(null);

  // EVENT HANDLERS

  const handleClick = () => {
    const currentIndex = ORDERED_ENCODER_VALUES.indexOf(midiNumber);
    const nextIndex =
      currentIndex == ORDERED_ENCODER_VALUES.length ? 0 : currentIndex + 1;
    const newId = ORDERED_ENCODER_VALUES[nextIndex] || null;

    // Remove previous callbacks if present.
    if (midiNumber) {
      removeListener(midiNumber, callbackId as string);
      setCallbackId(null);
    }

    // Add new callbacks if intended.
    if (newId) {
      const id = addListener(newId);
      setCallbackId(id);
    }

    setMidiNumber(newId);
  };

  // RENDER

  let color = "var(--cp-monochrome-text)";
  if (midiNumber == midiNumbers.BlueEncoder) {
    color = "var(--cp-te-blue)";
  } else if (midiNumber == midiNumbers.GreenEncoder) {
    color = "var(--cp-te-green)";
  } else if (midiNumber == midiNumbers.WhiteEncoder) {
    color = "var(--cp-te-white)";
  } else if (midiNumber == midiNumbers.OrangeEncoder) {
    color = "var(--cp-te-orange)";
  }

  return (
    midi.enabled && (
      <Button onClick={handleClick}>{cloneElement(children, { color })}</Button>
    )
  );
};

export default GenericMapper;
