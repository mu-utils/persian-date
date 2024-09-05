import {
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_SECOND,
} from "../../constants/timeConstants";
import DateType from "../../types/DateType";
import DateUint from "../../types/DateUnit";

/**
 * Calculates the difference between this date and another date in the specified
 * unit, considering leap years.
 *
 * @param {number} time1 - The timestamp of the first date
 * @param {number} time2 - The timestamp of the second date
 * @param {DateUint} unit - The unit for the difference calculation ("seconds",
 * "minutes", "hours", "days", "months", "years"). @default 'days'
 * @returns {number} The difference between the dates in the specified unit.
 *
 * @example
 * ```
 * // Get the difference in days between this date and another PersianDate
 * const daysDifference = this.diff(otherDate, 'days');
 * console.log(daysDifference); // Difference in days
 * ```
 */
export default function dffDates(
  time1: number,
  time2: number,
  unit: DateUint = "days"
): number {
  const diffInMs = Math.abs(time1 - time2);

  const millisecondsPerMonth = (MILLISECONDS_PER_DAY * 365.25) / 12;
  const millisecondsPerYear = MILLISECONDS_PER_DAY * 365.25;

  switch (unit) {
    case "seconds":
      return diffInMs / MILLISECONDS_PER_SECOND;
    case "minutes":
      return diffInMs / MILLISECONDS_PER_MINUTE;
    case "hours":
      return diffInMs / MILLISECONDS_PER_HOUR;
    case "days":
      return diffInMs / MILLISECONDS_PER_DAY;
    case "months":
      return diffInMs / millisecondsPerMonth;
    case "years":
      return diffInMs / millisecondsPerYear;
    default:
      throw new Error("Invalid unit");
  }
}
