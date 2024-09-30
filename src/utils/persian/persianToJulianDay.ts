// Constants
const PERSIAN_EPOCH = 1948320.5; // Julian Day for 622-03-19 AD (Start of Jalali calendar)

// Helper function to calculate the base epoch for Jalali year
function getEpochBase(year: number): number {
  return year >= 0 ? year - 474 : year - 473;
}

// Helper function to calculate Jalali year from epoch base
function getEpochYear(epochBase: number): number {
  return 474 + (epochBase % 2820);
}

/**
 *  Converts a Jalali date to a Julian Day Number (JDN).
 * @param {number} year - Jalali year.
 * @param {number} month  - Jalali month (1-12).
 * @param {number} day - Jalali day of the month.
 * @returns {number} The Julian Day Number corresponding to the Jalali date.
 */
export default function jalaliToJulianDay(
  year: number,
  month: number,
  day: number
): number {
  const epochBase = getEpochBase(year);
  const epochYear = getEpochYear(epochBase);

  const dayOfYear =
    day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6);
  const julianDay =
    dayOfYear +
    Math.floor((epochYear * 682 - 110) / 2816) +
    (epochYear - 1) * 365 +
    Math.floor(epochBase / 2820) * 1029983 +
    PERSIAN_EPOCH -
    1;

  return julianDay;
}
