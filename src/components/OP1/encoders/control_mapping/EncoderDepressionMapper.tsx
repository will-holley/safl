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
  onDepress: ControlDepressionCallback;
}> = ({ onDepress }) => {
  const midi = useMidi();

  // HANDLERS

  const handleAddition = (controlId: Op1EncoderDepressMidiNumber): string => {
    return midi.addCallback(
      controlId,
      onDepress,
      CallbackType.ControlDepression
    );
  };

  const handleRemoval = (
    controlId: Op1EncoderDepressMidiNumber,
    callbackId: string
  ): void => {
    midi.removeCallback(controlId, callbackId, CallbackType.ControlRelease);
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
