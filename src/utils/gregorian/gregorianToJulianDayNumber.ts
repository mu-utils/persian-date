import {
  MILLISECONDS_PER_DAY,
  UNIX_EPOCH_JDN,
} from "../../constants/timeConstants";

/**
 * Converts a Gregorian date to Julian Day Number.
 * The Julian Day Number is a continuous count of days since the
 * beginning of the Julian Period.
 * It is used in astronomy to calculate the positions of the planets.
 * 
 * @see https://en.wikipedia.org/wiki/Julian_day
 *
 * @param {number} gregorianYear - Gregorian year.
 * @param {number} gregorianMonth - Gregorian month.
 * @param {number} gregorianDay - Gregorian day.
 * @returns {number} Julian Day Number.
 */
function gregorianToJulianDayNumber(
  gregorianYear: number,
  gregorianMonth: number,
  gregorianDay: number
): number {
  return (
    Math.floor(
      new Date(
        Date.UTC(gregorianYear, gregorianMonth - 1, gregorianDay)
      ).getTime() / MILLISECONDS_PER_DAY
    ) + UNIX_EPOCH_JDN
  );
}


export default gregorianToJulianDayNumber;