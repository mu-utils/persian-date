const DateValidationResult = {
  /**
   * The invalid date value. This value is indicated the default value while
   * date is totally invalid.
   */
  DATE_IS_INVALID: 0,

  /**z
   * Indicate when persian date is invalid to convert from current calendar to
   * persian calendar.
   */
  PERSIAN_DATE_IS_INVALID: 1,

  /**
   * The way to determine whenever date is not valid for gregorian calendar.
   */
  GREGORIAN_DATE_IS_INVALID: 2,

  DATE_IS_VALID: 3,
} as const;

export default DateValidationResult;
