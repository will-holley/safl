/**
 * UI Component used to map rotations on a specified Encoder
 * to a given callback.
 */

// Types
import type { onEncoderRotation } from "@libs/OP1/types";

// Constants
import { Op1EncoderRotationControlIds } from "@libs/OP1/constants";

// Components
import GenericMapper from "./GenericMapper";
import { RefreshCircular } from "iconoir-react";

// Hooks
import useOP1 from "@components/OP1/context/useOP1";
import { Op1EncoderDepressControlIds } from "../../../../libs/OP1/constants";

const EncoderRotateMapper: React.FC<{
  onRotation: onEncoderRotation;
}> = ({ onRotation }) => {
  const op1 = useOP1();

  const handleAddition = (controlId: Op1EncoderDepressControlIds): string => {
    return op1.addRotationListener(controlId, onRotation);
  };

  const handleRemoval = (
    controlId: Op1EncoderRotationControlIds,
    listenerId: string
  ): void => {
    op1.removeRotationListener(controlId, listenerId);
  };

  return (
    <GenericMapper
      controlIds={Op1EncoderRotationControlIds}
      addListener={handleAddition}
      removeListener={handleRemoval}
    >
      <RefreshCircular />
    </GenericMapper>
  );
};

export default EncoderRotateMapper;
