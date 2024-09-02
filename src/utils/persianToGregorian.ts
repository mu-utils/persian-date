import { julianDayNumberToGregorian } from "./gregorianConvertions";
import { persianToJulianDayNumber } from "./persianDate";

/**
 * Converts a Persian date to Gregorian date.
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month.
 * @param {number} persianDay - Persian day.
 * @returns {object} Gregorian date.
 */
export function persianToGregorian(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): DateTuple {
  const julianDayNumber = persianToJulianDayNumber(
    persianYear,
    persianMonth,
    persianDay
  );
  const [year, month, day] = julianDayNumberToGregorian(julianDayNumber);
  return [year, month, day];
}
