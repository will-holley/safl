// Components
import {
  EncoderDepressionMapper,
  EncoderRotationMapper,
} from "../OP1/encoders/control_mapping";
import { RotationDirection } from "@components/OP1/midi/types";

// Constants
import { SCALE_NAMES, NOTE_NAMES } from "@constants/theory";

// Hooks
import useScaleSelector from "./useScaleSelector";

// Types
import { ActionType } from "./types";

export const ScaleSelector: React.FC<{}> = ({}) => {
  const { enabled, tonic, scaleName, dispatch } = useScaleSelector();

  const handleChangeEnabled = () =>
    dispatch({ type: ActionType.SwitchEnabled });

  const handleChangeTonic = (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch({
      type: ActionType.SetTonic,
      value: event.target.value,
    });

  const handleChangeScale = (event: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch({
      type: ActionType.SetScale,
      value: event.target.value,
    });

  const handleChangeScaleWithRotation = (direction: RotationDirection) =>
    dispatch({
      type: ActionType.CycleScale,
      direction,
    });

  const handleChangeTonicWithRotation = (direction: RotationDirection) =>
    dispatch({
      type: ActionType.CycleTonic,
      direction,
    });

  return (
    <>
      <>
        <label>Enabled</label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => handleChangeEnabled()}
        />
        <EncoderDepressionMapper onDepression={() => handleChangeEnabled()} />
      </>
      <>
        <label>Tonic</label>
        <select value={tonic} onChange={handleChangeTonic}>
          {NOTE_NAMES.map((name) => (
            <option key={`note-${name}`}>{name}</option>
          ))}
        </select>
        <EncoderRotationMapper onRotation={handleChangeTonicWithRotation} />
      </>
      <>
        <label>Scale</label>
        <select value={scaleName} onChange={handleChangeScale}>
          {SCALE_NAMES.map((name) => (
            <option key={`scale-${name}`}>{name}</option>
          ))}
        </select>
        <EncoderRotationMapper onRotation={handleChangeScaleWithRotation} />
      </>
    </>
  );
};
