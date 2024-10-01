import DateUint from "../../types/DateUnit";

/**
 * Modifies a given timestamp by adding a specified value in the given time unit.
 *
 * This function creates a new `Date` object from the provided timestamp, adjusts it
 * by adding the specified value in the selected time unit, and returns the resulting
 * timestamp.
 *
 * @param {number} time - The timestamp (in milliseconds) to be modified.
 * @param {DateUint} unit - The unit of time for modification. Can be one of:
 *   - "days"
 *   - "months"
 *   - "years"
 *   - "hours"
 *   - "minutes"
 *   - "seconds"
 * @param {number} value - The amount to add in the specified time unit.
 * @returns {number} The new timestamp (in milliseconds) after modification.
 *
 * @throws {Error} Throws an error if an invalid time unit is provided.
 *
 * @example
 * // Add 10 days to a given timestamp
 * const initialTime = new Date().getTime();
 * const newTime = modifyTime(initialTime, 'days', 10);
 * console.log(newTime); // Modified timestamp with 10 days added
 */
export default function modifyTime(
  time: number,
  value: number,
  unit: DateUint
): number {
  const date = new Date(time);

  switch (unit) {
    case "days":
      date.setDate(date.getDate() + value);
      break;
    case "months":
      date.setMonth(date.getMonth() + value);
      break;
    case "years":
      date.setFullYear(date.getFullYear() + value);
      break;
    case "hours":
      date.setHours(date.getHours() + value);
      break;
    case "minutes":
      date.setMinutes(date.getMinutes() + value);
      break;
    case "seconds":
      date.setSeconds(date.getSeconds() + value);
      break;
    default:
      throw new Error("Invalid unit");
  }

  return date.getTime();
}
