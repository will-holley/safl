// Hooks
import { useEffect, useState, useRef, useCallback } from "react";

// Libs
import { WebMidi } from "webmidi";
import uuid4 from "uuid4";

// Context
import Context from "./context";

// Utils
import { csr } from "@utils/browser";

// Types
import type {
  Input,
  NoteMessageEvent,
  ControlChangeMessageEvent,
} from "webmidi";
import type {
  KeyDepressionCallbacks,
  KeyReleaseCallbacks,
  ControlDepressionCallbacks,
  ControlReleaseCallbacks,
  EncoderRotationCallbacks,
  Callback,
  CallbacksMap,
} from "./types";
import { CallbackType } from "./types";

const MidiProvider: React.FC<{
  children: React.ReactElement | Array<React.ReactElement>;
}> = ({ children }) => {
  // HOOKS
  const driver = useRef<typeof WebMidi>(WebMidi);
  const [input, setInput] = useState<Input | null>(null);

  // STATE
  const [keyDepressionCallbacks, setKeyDepressionCallbacks] =
    useState<KeyDepressionCallbacks>({});
  const [keyReleaseCallbacks, setKeyReleaseCallbacks] =
    useState<KeyReleaseCallbacks>({});
  const [ctrlDepressionCallbacks, setCtrlDepressionCallbacks] =
    useState<ControlDepressionCallbacks>({});
  const [ctrlReleaseCallbacks, setCtrlReleaseCallbacks] =
    useState<ControlReleaseCallbacks>({});
  const [encoderRotationCallbacks, setEncoderRotationCallbacks] =
    useState<EncoderRotationCallbacks>({});

  // HELPERS

  /**
   * Determines which state setter to use based on the type of callback provided.
   */
  const getSetter = (callbackType: CallbackType): React.SetStateAction<any> => {
    switch (callbackType) {
      case CallbackType.KeyDepression: {
        return setKeyDepressionCallbacks;
      }
      case CallbackType.KeyRelease: {
        return setKeyReleaseCallbacks;
      }
      case CallbackType.ControlDepression: {
        return setCtrlDepressionCallbacks;
      }
      case CallbackType.ControlRelease: {
        return setCtrlReleaseCallbacks;
      }
      case CallbackType.EncoderRotation: {
        return setEncoderRotationCallbacks;
      }
      default: {
        throw new Error();
      }
    }
  };

  const addCallback = (
    midiNumber: number,
    callback: Callback,
    callbackType: CallbackType
  ): string => {
    const callbackId = uuid4();
    const setter = getSetter(callbackType);
    setter((prevState: CallbacksMap) => {
      // Initialize if necessary.
      if (!prevState.hasOwnProperty(midiNumber)) prevState[midiNumber] = {};
      prevState[midiNumber][callbackId] = callback;
      return prevState;
    });

    return callbackId;
  };

  const removeCallback = (
    midiNumber: number,
    callbackId: string,
    callbackType: CallbackType
  ): void => {
    const setter = getSetter(callbackType);
    setter((prevState: CallbacksMap) => {
      delete prevState[midiNumber][callbackId];
      return prevState;
    });
  };

  // EVENT HANDLERS

  const handleKeyDepression = useCallback(
    (event: NoteMessageEvent): void => {
      const midiNumber = event.note.number;
      if (keyDepressionCallbacks[midiNumber]) {
        Object.values(keyDepressionCallbacks[midiNumber]).forEach((callback) =>
          callback(event.note)
        );
      }
    },
    [keyDepressionCallbacks]
  );

  const handleKeyRelease = useCallback(
    (event: NoteMessageEvent): void => {
      const midiNumber = event.note.number;
      if (keyReleaseCallbacks[midiNumber]) {
        Object.values(keyReleaseCallbacks[midiNumber]).forEach((callback) =>
          callback(event.note)
        );
      }
    },
    [keyReleaseCallbacks]
  );

  const handleControlDepression = useCallback(
    (event: ControlChangeMessageEvent): void => {
      const midiNumber = event.controller.number;
      const interactionValue = event.message.data[2];

      // Control Depression
      if (interactionValue === 127 && ctrlDepressionCallbacks[midiNumber]) {
        Object.values(ctrlDepressionCallbacks[midiNumber]).forEach((callback) =>
          callback()
        );
      }
    },
    [ctrlDepressionCallbacks]
  );

  const handleControlRelease = useCallback(
    (event: ControlChangeMessageEvent): void => {
      const midiNumber = event.controller.number;
      const interactionValue = event.message.data[2];

      // Control Release
      if (interactionValue === 0 && ctrlReleaseCallbacks[midiNumber]) {
        Object.values(ctrlReleaseCallbacks[midiNumber]).forEach((callback) =>
          callback()
        );
      }
    },
    [ctrlReleaseCallbacks]
  );

  const handleEncoderRotation = useCallback(
    (event: ControlChangeMessageEvent): void => {
      const midiNumber = event.controller.number;
      const interactionValue = event.message.data[2];

      // Encoder Rotation
      if (encoderRotationCallbacks[midiNumber]) {
        Object.values(encoderRotationCallbacks[midiNumber]).forEach(
          (callback) => callback(interactionValue)
        );
      }
    },
    [encoderRotationCallbacks]
  );

  // EFFECTS

  /**
   * On client-side mount.
   */
  const isClient = csr();
  useEffect(() => {
    async function initialize() {
      await driver.current.enable();

      // Verify that OP1 is connected
      const _input = driver.current.getInputByName("OP-1 Midi Device");

      if (!_input) throw new Error("No OP-1 Midi connection");
      setInput(_input);
    }
    if (isClient) initialize();
  }, [isClient]);

  /**
   * On input connection, listen for Key depressions.
   * When handler updates in response to addition/removal of callbacks, re-attach listener.
   */
  useEffect(() => {
    if (!input) return;
    input.addListener("noteon", handleKeyDepression);
    return () => input.removeListener("noteon", handleKeyDepression);
  }, [input, handleKeyDepression]);

  /**
   * On input connection, listen for Key releases.
   * When handler updates in response to addition/removal of callbacks, re-attach listener.
   */
  useEffect(() => {
    if (!input) return;
    input.addListener("noteoff", handleKeyRelease);
    return () => input.removeListener("noteoff", handleKeyRelease);
  }, [input, handleKeyRelease]);

  /**
   * On input connection, listen for Control depressions.
   * When handler updates in response to addition/removal of callbacks, re-attach listener.
   */
  useEffect(() => {
    if (!input) return;
    input.addListener("controlchange", handleControlDepression);
    return () => input.removeListener("controlchange", handleControlDepression);
  }, [input, handleControlDepression]);

  /**
   * On input connection, listen for Control releases.
   * When handler updates in response to addition/removal of callbacks, re-attach listener.
   */
  useEffect(() => {
    if (!input) return;
    input.addListener("controlchange", handleControlRelease);
    return () => input.removeListener("controlchange", handleControlRelease);
  }, [input, handleControlRelease]);

  /**
   * On input connection, listen for Encoder rotations.
   * When handler updates in response to addition/removal of callbacks, re-attach listener.
   */
  useEffect(() => {
    if (!input) return;
    input.addListener("controlchange", handleEncoderRotation);
    return () => input.removeListener("controlchange", handleEncoderRotation);
  }, [input, handleEncoderRotation]);

  // RENDER
  const enabled = Boolean(input);

  return (
    <Context.Provider
      value={{
        enabled,
        addCallback: enabled ? addCallback : null,
        removeCallback: enabled ? removeCallback : null,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MidiProvider;
