import DateTuple from "../types/DateTuple";
import { julianDayNumberToGregorian } from "./gregorianConventions";
import persianToJulianDayNumber from "./persianToJulianDayNumber";

/**
 * Converts a Persian date to Gregorian date.
 *
 * Firstly converts Persian date to Julian day number, then converts Julian day
 * number to Gregorian date. Lastly, returns Gregorian date in tuple of year,
 * month, and day.
 *
 * @example
 * ```
 * persianToGregorian(1403, 6, 12); // [2024, 9, 2]
 * ```
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month.
 * @param {number} persianDay - Persian day.
 * @returns {DateTuple} Gregorian date in tuple of year, month, and day.
 */
export default function persianToGregorian(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): DateTuple {
  const julianDayNumber = persianToJulianDayNumber(
    persianYear,
    persianMonth,
    persianDay
  );
  return julianDayNumberToGregorian(julianDayNumber);
}
