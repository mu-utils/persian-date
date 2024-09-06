/**
 * An array containing the number of days in each month of the Persian
 * calendar. For example, Farvadin has 31 days and Esfand has 30 days except
 * in leap years.
 */
export const PERSIAN_MONTHS_DAYS = [
  31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29,
] as const;

/**
 * The epoch of the Persian calendar.
 * The epoch is the point in time from which the calendar is counted.
 */
export const PERSIAN_EPOCH = 1948320.5;

/**
 * The number of days in a Persian year.
 */
export const PERSIAN_YEAR_LENGTH = 365;

/**
 * The number of days in a Persian cycle.
 * A cycle is a period of 2820 years.
 */
export const PERSIAN_CYCLE_DAYS = 33;

/**
 * The number of days in a Persian cycle that are leap years.
 * A leap year is a year that is divisible by 4 but not by 100,
 */
export const PERSIAN_LEAP_YEAR_CYCLE = 4;

export const PERSIAN_EXTRA_DAYS_IN_CYCLE = 8;

/**
 * The number of days in a Persian cycle that are leap years.
 */
export const PERSIAN_LEAP_DAYS = 78;

/**
 * The base year for Persian calendar calculations.
 */
export const PERSIAN_BASE_YEAR = 474;

/**
 * The number of days in a Persian year cycle.
 */
export const PERSIAN_YEAR_CYCLE = 2820;

/**
 * The minimum year that can be converted to the Persian calendar.
 */
export const PERSIAN_MIN_YEAR = 1200;

/**
 * The maximum year that can be converted to the Persian calendar.
 */
export const PERSIAN_MAX_YEAR = 1500;

/**
 * The total number of days in 2820 years.
 */
export const PERSIAN_TOTAL_DAYS_IN_2820_YEARS = 10631060;

/**
 * An array containing the number of days that passed in each month of the
 */
export const PERSIAN_PASSED_DAYS_IN_MONTHS = [
  0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334,
] as const;

/**
 * Multiplier used in Persian leap year calculations.
 */
export const PERSIAN_LEAP_YEAR_MULTIPLIER = 682;

/**
 * Adjustment factor for leap year calculation.
 */
export const PERSIAN_LEAP_YEAR_ADJUSTMENT = 110;

/**
 * Divisor for determining leap years.
 */
export const PERSIAN_LEAP_YEAR_DIVISOR = 2816;

/**
 * Number of days in a 400 year cycle.
 */
export const PERSIAN_DAYS_IN_400_YEARS = 146097;

/**
 * Number of days in a 100 year cycle.
 */
export const PERSIAN_DAYS_IN_100_YEARS = 36524;

/**
 * Number of days in a 4 year cycle.
 */
export const PERSIAN_DAYS_IN_4_YEARS = 1461;

/**
 * Number of days in a year.
 */
export const PERSIAN_DAYS_IN_YEAR = 365;

/**
 * The offset of the epoch year.
 */
export const PERSIAN_EPOCH_OFFSET = 979;
