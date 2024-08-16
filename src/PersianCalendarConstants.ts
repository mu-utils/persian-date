export default class PersianCalendarConstants {
  /**
   * An array containing the number of days in each month of the Persian
   * calendar. For example, farvadin has 31 days and esfand has 30 days except
   * in leap years.
   */
  static readonly PERSIAN_MONTHS_DAYS = [
    31, 31, 31, 30, 31, 30, 31, 30, 30, 30, 29, 30,
  ];

  /**
   * The epoch of the Persian calendar.
   */
  static readonly PERSIAN_EPOCH = 1948321;

  /**
   * The base year for Persian calendar calculations.
   */
  static readonly YEAR_BASE_ADJUSTMENT = 474;

  /**
   * The number of days in a Persian year cycle.
   */
  static readonly YEAR_CYCLE_LENGTH = 2820;

  /**
   * The minimum year that can be converted to the Persian calendar.
   */
  static readonly MIN_PERSIAN_YEAR = 1200;

  /**
   * The maximum year that can be converted to the Persian calendar.
   */
  static readonly MAX_PERSIAN_YEAR = 1500;
}
