/**
 * UI Component used to map rotations on a specified Encoder
 * to a given callback.
 */

// Types
import { Op1EncoderRotationMidiNumber } from "@T/op1";
import type { EncoderRotationCallback } from "@components/OP1/midi/types";
import { CallbackType } from "@components/OP1/midi/types";

// Components
import GenericMapper from "./GenericMapper";
import { RefreshCircular } from "iconoir-react";

// Hooks
import useMidi from "@components/OP1/midi/useMidi";

const EncoderRotationMapper: React.FC<{
  onRotation: EncoderRotationCallback;
}> = ({ onRotation }) => {
  const midi = useMidi();

  const handleAddition = (midiNumber: Op1EncoderRotationMidiNumber): string => {
    return midi.addCallback(
      midiNumber,
      onRotation,
      CallbackType.EncoderRotation
    );
  };

  const handleRemoval = (
    midiNumber: Op1EncoderRotationMidiNumber,
    callbackId: string
  ): void => {
    midi.removeCallback(midiNumber, callbackId, CallbackType.EncoderRotation);
  };

  return (
    <GenericMapper
      midiNumbers={[
        Op1EncoderRotationMidiNumber.BlueEncoder,
        Op1EncoderRotationMidiNumber.GreenEncoder,
        Op1EncoderRotationMidiNumber.WhiteEncoder,
        Op1EncoderRotationMidiNumber.OrangeEncoder,
      ]}
      addCallback={handleAddition}
      removeCallback={handleRemoval}
    >
      <RefreshCircular />
    </GenericMapper>
  );
};

export default EncoderRotationMapper;
