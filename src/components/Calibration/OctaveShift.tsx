/**
 * Enables calibration with the OP-1's current octave transposition
 * in order to correctly identify Midi numbers and key presses.
 */

import useCalibration from "./useCalibration";

import { ActionType } from "./types";

const OctaveShift: React.FC<{}> = ({}) => {
  const calibration = useCalibration();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    calibration.dispatch({
      type: ActionType.SetOctaveShift,
      value: parseInt(event.target.value),
    });
  };

  return (
    <>
      <label>Octave Shift</label>
      <select value={calibration.octaveShift} onChange={handleChange}>
        <option value={-4}>-4</option>
        <option value={-3}>-3</option>
        <option value={-2}>-2</option>
        <option value={-1}>-1</option>
        <option value={0}>0</option>
        <option value={1}>+1</option>
        <option value={2}>+2</option>
        <option value={3}>+3</option>
        <option value={4}>+4</option>
      </select>
    </>
  );
};

export default OctaveShift;
