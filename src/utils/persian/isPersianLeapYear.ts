/**
 * Checks if a given Persian (Jalali) year is a leap year.
 * @param {number} year - Persian year.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 *
 * Calculates the year in the 33-year Persian cycle and determines if it's a leap year
 * based on the cycle calculation.
 */
export default function isPersianLeapYear(year: number): boolean {
  const cycleYear = ((year - 474) % 2820) + 474;
  return ((cycleYear + 38) * 682) % 2816 < 682;
}
