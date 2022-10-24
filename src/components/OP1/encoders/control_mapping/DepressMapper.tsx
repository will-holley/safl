/**
 * UI Component used to map depressions on a specified Encoder to
 * a given callback.
 */

// Types
import type { onButtonDepress } from "@libs/OP1/types";
import { ButtonType } from "@libs/OP1/types";

// Constants
import { Op1EncoderDepressControlIds } from "@libs/OP1/constants";

// Components
import GenericMapper from "./GenericMapper";
import { DownloadCircledOutline } from "iconoir-react";

// Hooks
import useOP1 from "@components/OP1/context/useOP1";

const EncoderDepressMapper: React.FC<{
  onDepress: onButtonDepress;
}> = ({ onDepress }) => {
  const op1 = useOP1();

  // HANDLERS

  const handleAddition = (controlId: Op1EncoderDepressControlIds): string => {
    return op1.addPressListener(
      controlId,
      onDepress,
      () => {},
      ButtonType.Control
    );
  };

  const handleRemoval = (
    controlId: Op1EncoderDepressControlIds,
    listenerId: string
  ): void => {
    op1.removePressListener(controlId, listenerId, ButtonType.Control);
  };

  // RENDER

  return (
    <GenericMapper
      controlIds={Op1EncoderDepressControlIds}
      addListener={handleAddition}
      removeListener={handleRemoval}
    >
      <DownloadCircledOutline />
    </GenericMapper>
  );
};

export default EncoderDepressMapper;
