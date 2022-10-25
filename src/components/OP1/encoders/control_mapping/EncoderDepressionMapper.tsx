/**
 * UI Component used to map depressions on a specified Encoder to
 * a given callback.
 */

// Types
import type { ControlDepressionCallback } from "@components/OP1/midi/types";
import { CallbackType } from "@components/OP1/midi/types";
import { Op1EncoderDepressMidiNumber } from "@T/op1";

// Components
import GenericMapper from "./GenericMapper";
import { DownloadCircledOutline } from "iconoir-react";

// Hooks
import useMidi from "@components/OP1/midi/useMidi";

const EncoderDepressionMapper: React.FC<{
  onDepression: ControlDepressionCallback;
}> = ({ onDepression }) => {
  const midi = useMidi();

  // HANDLERS

  const handleAddition = (midiNumber: Op1EncoderDepressMidiNumber): string => {
    return midi.addCallback(
      midiNumber,
      onDepression,
      CallbackType.ControlDepression
    );
  };

  const handleRemoval = (
    midiNumber: Op1EncoderDepressMidiNumber,
    callbackId: string
  ): void => {
    midi.removeCallback(midiNumber, callbackId, CallbackType.ControlDepression);
  };

  // RENDER

  return (
    <GenericMapper
      midiNumbers={Op1EncoderDepressMidiNumber}
      addListener={handleAddition}
      removeListener={handleRemoval}
    >
      <DownloadCircledOutline />
    </GenericMapper>
  );
};

export default EncoderDepressionMapper;
