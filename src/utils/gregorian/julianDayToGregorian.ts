/**
 * Converts a Julian day number to a Gregorian date.
 * @param {number} julianDay - The Julian day number to convert.
 * @returns {Date} - The corresponding Gregorian date.
 *
 * Uses the Julian date offset for the Unix epoch and calculates the number of milliseconds
 * since the Unix epoch to create a Date object.
 */
export default function julianDayToGregorian(julianDay: number): Date {
  const JULIAN_DATE_OFFSET = 2440587.5; // Julian day for Unix epoch (1970-01-01)
  const millisecondsSinceEpoch = (julianDay - JULIAN_DATE_OFFSET) * 86400000;
  const d = new Date(millisecondsSinceEpoch);
  return d;
}
