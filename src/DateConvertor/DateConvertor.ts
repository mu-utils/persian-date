/**
 * The `DateConvertor` class extends the built-in `Date` class and provides utility methods for working with the Persian calendar.
 *
 * The class includes the following static properties:
 * - `PERSIAN_MONTHS_DAYS`: An array containing the number of days in each month of the Persian calendar.
 * - `PERSIAN_EPOCH`: The epoch of the Persian calendar.
 * - `YEAR_BASE_ADJUSTMENT`: The number of days in a Persian month.
 * - `YEAR_CYCLE_LENGTH`: The number of days in a Persian year.
 * - `BASE_PERSIAN_YEAR`: The number of days in a Persian leap year.
 *
 * The class also includes the following static methods:
 * - `isValidPersianDate(year: number, month: number, day: number): boolean`: Checks if the given Persian date is valid.
 * - `isLeapYear(year: number): boolean`: Checks if the given Persian year is a leap year.
 */
export default class DateConvertor extends Date {
  /**
   * An array containing the number of days in each month of the Persian calendar.
   * The array is indexed by the month number (1-12), with the first element
   * corresponding to Farvardin (the first month) and the last element
   * corresponding to Esfand (the twelfth month).
   */
  private static readonly PERSIAN_MONTHS_DAYS = [
    31, // Farvardin
    31, // Ordibehesht
    31, // Khordad
    30, // Tir
    31, // Mordad
    30, // Shahrivar
    31, // Mehr
    30, // Aban
    30, // Azar
    30, // Dey
    29, // Bahman
    30, // Esfand
  ];

  /**
   * The epoch of the Persian calendar.
   */
  private static readonly PERSIAN_EPOCH = 1948321;

  /**
   * The number of days in a Persian month.
   */
  private static readonly YEAR_BASE_ADJUSTMENT = 474;

  /**
   * The number of days in a Persian year.
   */
  private static readonly YEAR_CYCLE_LENGTH = 2820;

  /**
   * The number of days in a Persian leap year.
   */
  private static readonly BASE_PERSIAN_YEAR = 474;

  /**
   * Determines whether the given Persian date is valid.
   *
   * The function checks if the year is within the valid range (1-9999), the month is within the valid range (1-12), and the day is within the valid range for the given month and year.
   *
   * @param year - The year of the Persian date to check.
   * @param month - The month of the Persian date to check.
   * @param day - The day of the Persian date to check.
   * @returns `true` if the Persian date is valid, `false` otherwise.
   */
  protected static isValidPersianDate(
    year: number,
    month: number,
    day: number
  ): boolean {
    if (year < 1 || year > 9999) return false;
    if (month < 1 || month > 12) return false;

    const maxDaysInMonth = DateConvertor.PERSIAN_MONTHS_DAYS[month - 1];
    if (month === 12 && DateConvertor.isLeapYear(year)) {
      return day >= 1 && day <= 30; // Esfand has 30 days in leap years
    }

    return day >= 1 && day <= maxDaysInMonth;
  }

  /**
   * Determines whether the given year is a leap year in the Persian calendar.
   *
   * The Persian calendar has a leap year every 4 years, except for years divisible by 100 that are not divisible by 400.
   *
   * @param year - The year to check for leap year.
   * @returns `true` if the year is a leap year, `false` otherwise.
   */
  private static isLeapYear(year: number): boolean {
    if (year % 4 === 3 && year % 100 !== 0) {
      return true;
    }

    return year % 400 === 0;
  }
}
