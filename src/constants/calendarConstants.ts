/**
 * The offset of the epoch month.
 *
 * Key years in the Jalaali calendar system used for conversions and calculations.
 * These years represent significant transitions or epochs in the Jalaali calendar.
 *
 * @implements calculateEpochYears(startYear, endYear, cycleLength, leapAdjustment)
 * where each argument represents a key year in the Persian calendar system.
 *
 * @constant {number[]} PERSIAN_EPOCH_YEARS
 */
export const PERSIAN_EPOCH_YEARS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192,
  2262, 2324, 2394, 2456, 3178,
];

/**
 * The length of a cycle in the Persian calendar. This value represents the
 * number of years in a cycle. A cycle is a period of 33 years in the Persian
 * calendar. Each cycle is divided into 8 leap years and 25 non-leap years.
 */
export const PERSIAN_CYCLE_LENGTH = 33;

/**
 * The number of leap years in a cycle. A cycle is a period of 33 years in the
 */
export const PERSIAN_LEAP_CYCLE = 4;
