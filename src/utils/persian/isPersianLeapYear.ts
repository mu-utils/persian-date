/**
 * Determines whether the given year is a leap year in the Persian calendar.
 *
 * The Persian calendar has a leap year every 4 years, except for years
 * divisible by 100 that are not divisible by 400.
 *
 * @param {number} year  - The year to check for leap year.
 * @returns {boolean} True if the year is a leap year, false otherwise.s
 */
export default function isPersianLeapYear(year: number): boolean {
  if (year % 4 === 3 && year % 100 !== 0) {
    return true;
  }

  return year % 400 === 0;
}
