// Utils
import React, { cloneElement } from "react";
import styled from "styled-components";

// Hooks
import useOP1 from "@components/OP1/context/useOP1";
import { useState, useEffect, useRef } from "react";

// Constants
import {
  Op1EncoderRotationControlIds,
  Op1EncoderDepressControlIds,
} from "@libs/OP1/constants";

// Types

type ControlIds = Op1EncoderRotationControlIds | Op1EncoderDepressControlIds;

const Button = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const GenericMapper: React.FC<{
  children: React.ReactElement;
  controlIds: ControlIds;
  addListener: (controlId: number) => string;
  removeListener: (controlId: number, listenerId: string) => void;
}> = ({
  // Icon to display
  children,
  controlIds,
  addListener,
  removeListener,
}) => {
  // CONSTANTS
  const ORDERED_ENCODER_VALUES = [
    null,
    controlIds.BlueEncoder,
    controlIds.GreenEncoder,
    controlIds.WhiteEncoder,
    controlIds.OrangeEncoder,
  ];

  // HOOKS

  const op1 = useOP1();

  // STATE

  const [controlId, setControlId] = useState<number | null>(null);
  const [listenerId, setListenerId] = useState<string | null>(null);
  const listenerAdded = useRef<boolean>(false);

  // EFFECTS

  /**
   * Set flag once listener has been added.
   */
  // useEffect(() => {
  //   if (controlId && listenerId && !listenerAdded.current) {
  //     console.log("Listener initialized");
  //   }
  // }, [controlId, listenerId]);

  /**
   * When a callback's control flow changes in response to its previous invocation
   * (i.e. it modifies a value that it reads, for example, when flipping the value of
   * a boolean flag with `set(!value)`), it is necessary to refresh the listener to use
   * the new callback.
   */
  // useEffect(() => {
  //   // If listener is added during this cycle, wait for addListener to be updated.
  //   if (!listenerAdded.current && listenerId) {
  //     listenerAdded.current = true;
  //   } else if (listenerAdded.current) {
  //     // Refresh listener
  //     console.log("Refreshing Listener");
  //     removeListener(controlId as number, listenerId as string);
  //     const updatedListenerId = addListener(controlId as number);
  //     setListenerId(updatedListenerId);
  //   }
  // }, [addListener, listenerId, controlId]);

  // EVENT HANDLERS

  const handleClick = () => {
    const currentIndex = ORDERED_ENCODER_VALUES.indexOf(controlId);
    const nextIndex =
      currentIndex == ORDERED_ENCODER_VALUES.length ? 0 : currentIndex + 1;
    const newId = ORDERED_ENCODER_VALUES[nextIndex] || null;

    // Remove previous callbacks if present.
    if (controlId) {
      removeListener(controlId, listenerId as string);
      setListenerId(null);
    }

    // Add new callbacks if intended.
    if (newId) {
      const _listenerId = addListener(newId);
      setListenerId(_listenerId);
    }

    setControlId(newId);
  };

  // RENDER

  let color = "var(--cp-monochrome-text)";
  if (controlId == controlIds.BlueEncoder) {
    color = "var(--cp-te-blue)";
  } else if (controlId == controlIds.GreenEncoder) {
    color = "var(--cp-te-green)";
  } else if (controlId == controlIds.WhiteEncoder) {
    color = "var(--cp-te-white)";
  } else if (controlId == controlIds.OrangeEncoder) {
    color = "var(--cp-te-orange)";
  }

  return (
    op1.enabled && (
      <Button onClick={handleClick}>{cloneElement(children, { color })}</Button>
    )
  );
};

export default GenericMapper;
