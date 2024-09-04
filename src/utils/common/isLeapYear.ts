/**
 * Checks if a given year is a leap year in the Gregorian calendar.
 *
 * A year is considered a leap year if:
 * - It is divisible by 4.
 * - It is not divisible by 100, unless it is also divisible by 400.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
export default function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
