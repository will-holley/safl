// Utils
import React, { cloneElement } from "react";
import styled from "styled-components";

// Hooks
import useMidi from "@components/OP1/midi/useMidi";
import { useState, useEffect } from "react";

const Button = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const GenericMapper: React.FC<{
  children: React.ReactElement;
  // Ordered (B,G,W,O) array of midi numbers for the Encoders
  midiNumbers: Array<number>;
  addCallback: (midiNumber: number) => string;
  removeCallback: (midiNumber: number, callbackId: string) => void;
}> = ({
  // Icon to display
  children,
  midiNumbers,
  addCallback,
  removeCallback,
}) => {
  // CONSTANTS
  const ORDERED_ENCODER_VALUES = [null, ...midiNumbers];

  // HOOKS

  const midi = useMidi();

  // STATE

  const [midiNumber, setMidiNumber] = useState<number | null>(null);
  const [callbackId, setCallbackId] = useState<string | null>(null);

  // EFFECTS

  /**
   * Triggered by changes to Midi Number and addCallback.
   * If either is updated and both values are present, callback
   * is re-added for this Midi Number.
   */
  useEffect(() => {
    if (midiNumber && addCallback) {
      const id = addCallback(midiNumber);
      setCallbackId(id);
    }
  }, [midiNumber, addCallback]);

  // EVENT HANDLERS

  /**
   * On click, cycle to the next Midi number. If the current number
   * has an attached callback, remove the callback prior to cycling.
   */
  const handleClick = () => {
    const currentIndex = ORDERED_ENCODER_VALUES.indexOf(midiNumber);
    const nextIndex =
      currentIndex == ORDERED_ENCODER_VALUES.length ? 0 : currentIndex + 1;
    const nextMidiNumber = ORDERED_ENCODER_VALUES[nextIndex] || null;

    // Remove previous callbacks if present.
    if (midiNumber && callbackId) {
      removeCallback(midiNumber, callbackId);
      setCallbackId(null);
    }

    setMidiNumber(nextMidiNumber);
  };

  // RENDER

  let color = "var(--cp-monochrome-text)";
  if (midiNumber == midiNumbers[0]) {
    color = "var(--cp-te-blue)";
  } else if (midiNumber == midiNumbers[1]) {
    color = "var(--cp-te-green)";
  } else if (midiNumber == midiNumbers[2]) {
    color = "var(--cp-te-white)";
  } else if (midiNumber == midiNumbers[3]) {
    color = "var(--cp-te-orange)";
  }

  return midi.enabled ? (
    <Button onClick={handleClick}>{cloneElement(children, { color })}</Button>
  ) : (
    <></>
  );
};

export default GenericMapper;
