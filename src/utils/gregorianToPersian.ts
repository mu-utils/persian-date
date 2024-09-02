import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";

/**
 * Converts a Gregorian date to Persian date.
 *
 * @param {number} gregorianYear - Gregorian year.
 * @param {number} gregorianMonth - Gregorian month.
 * @param {number} gregorianDay - Gregorian day.
 * @returns {object} Persian date.
 */
export function gregorianToPersian(
  gregorianYear,
  gregorianMonth,
  gregorianDay
) {
  return julianDayNumberToPersian(
    gregorianToJulianDayNumber(gregorianYear, gregorianMonth, gregorianDay)
  );
}
