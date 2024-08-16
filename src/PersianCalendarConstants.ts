export default class PersianCalendarConstants {
  /**
   * An array containing the number of days in each month of the Persian
   * calendar. For example, farvadin has 31 days and esfand has 30 days except
   * in leap years.
   */
  static readonly MONTHS_DAYS = [
    31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29,
  ];

  /**
   * The epoch of the Persian calendar.
   */
  static readonly EPOCH = 1948321;

  /**
   * The base year for Persian calendar calculations.
   */
  static readonly BASE_YEAR = 474;

  /**
   * The number of days in a Persian year cycle.
   */
  static readonly YEAR_CYCLE = 2820;

  /**
   * The minimum year that can be converted to the Persian calendar.
   */
  static readonly MIN_YEAR = 1200;

  /**
   * The maximum year that can be converted to the Persian calendar.
   */
  static readonly MAX_YEAR = 1500;

  private static readonly PASSED_DAYS_IN_MONTHS = [
    0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336,
  ];
}
