import DateTuple from "../types/DateTuple";
import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";
import julianDayNumberToPersian from "./julianDaynumberToPersian";

/**
 * Converts a Gregorian date to Persian date.
 * In case of Intl is not available, it uses the fallback implementation.
 *
 * @param {number} gregorianYear - Gregorian year.
 * @param {number} gregorianMonth - Gregorian month.
 * @param {number} gregorianDay - Gregorian day.
 * @returns {DateTuple} Persian date in tuple format (year, month, day).
 */
export function gregorianToPersian(
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): object {
  return julianDayNumberToPersian(
    gregorianToJulianDayNumber(gregorianYear, gregorianMonth, gregorianDay)
  );
}
