import DateTuple from "../../types/DateTuple";

// Helper function to calculate the adjusted Julian Day
function adjustJulianDay(julianDay: number): {
  integerPart: number;
  fractionalPart: number;
} {
  const JD_OFFSET = 0.5;
  const integerPart = Math.floor(julianDay + JD_OFFSET);
  const fractionalPart = julianDay + JD_OFFSET - integerPart;
  return { integerPart, fractionalPart };
}

// Helper function to calculate the Gregorian correction for Julian Day
function getGregorianCorrection(julianDayInt: number): number {
  if (julianDayInt >= 2299161) {
    const alpha = Math.floor((julianDayInt - 1867216.25) / 36524.25);
    return julianDayInt + 1 + alpha - Math.floor(alpha / 4);
  }
  return julianDayInt;
}

// Helper function to calculate the Gregorian year, month, and day
function calculateGregorianDate(julianDay: number): DateTuple {
  const { integerPart: julianDayInt, fractionalPart: julianDayFraction } =
    adjustJulianDay(julianDay);
  const correctedJulianDay = getGregorianCorrection(julianDayInt);

  const tempDays = correctedJulianDay + 1524;
  const yearEstimate = Math.floor((tempDays - 122.1) / 365.25);
  const dayOfYear = Math.floor(365.25 * yearEstimate);
  const monthEstimate = Math.floor((tempDays - dayOfYear) / 30.6001);

  const day =
    tempDays -
    dayOfYear -
    Math.floor(30.6001 * monthEstimate) +
    julianDayFraction;
  const month = monthEstimate < 14 ? monthEstimate - 1 : monthEstimate - 13;
  const year = month > 2 ? yearEstimate - 4716 : yearEstimate - 4715;

  return [Math.floor(year), Math.floor(month), Math.floor(day)];
}

/**
 * Converts a Julian day number to a Gregorian date. Uses the Julian date
 * offset for the Unix epoch and calculates the number of milliseconds.
 *
 * @param {number} julianDay - The Julian day number to convert.
 * @returns {Date} - The corresponding Gregorian date.
 */
export default function julianDayToGregorian(julianDay: number): DateTuple {
  return calculateGregorianDate(julianDay);
}
