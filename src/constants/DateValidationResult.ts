export default class DateValidationResult {
  /**
   * The invalid date value. This value is indicated the default value while
   * date is totally invalid.
   */
  static readonly DATE_IS_INVALID = 0;

  /**
   * Indicate when persian date is invalid to convert from current calendar to
   * persian calendar.
   */
  static readonly PERSIAN_DATE_IS_INVALID = 1;

  /**
   * The way to determine whenever date is not valid for gregorian calendar.
   */
  static readonly GREGORIAN_DATE_IS_INVALID = 2;

  static readonly DATE_IS_VALID = 3;
}
