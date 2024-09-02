import DateTuple from "../types/DateTuple";
import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";
import julianDayNumberToPersian from "./julianDayNumberToPersian";

/**
 * Converts a Gregorian date to Persian date.
 * In case of Intl is not available, it uses the fallback implementation.
 *
 * @param {number} gregorianYear - Gregorian year.
 * @param {number} gregorianMonth - Gregorian month.
 * @param {number} gregorianDay - Gregorian day.
 * @returns {DateTuple} Persian date in tuple format (year, month, day).
 */
export default function gregorianToPersian(
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): DateTuple {
  return julianDayNumberToPersian(
    gregorianToJulianDayNumber(gregorianYear, gregorianMonth, gregorianDay)
  );
}
