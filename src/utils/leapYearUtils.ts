import PersianCalendarConstants from "../constants/PersianCalendarConstants";

/**
 * Calculates the leap year factor for a given epoch year.
 * @param epochYear - The year in the epoch to check for leap year.
 */
export const getLeapYearFactor = (epochYear: number): number => {
  return Math.floor(
    (epochYear * PersianCalendarConstants.LEAP_YEAR_MULTIPLIER -
      PersianCalendarConstants.LEAP_YEAR_ADJUSTMENT) /
      PersianCalendarConstants.LEAP_YEAR_DIVISOR
  );
};

/**
 * Determines whether the given year is a leap year in the Persian calendar.
 *
 * The Persian calendar has a leap year every 4 years, except for years
 * divisible by 100 that are not divisible by 400.
 *
 * @param year - The year to check for leap year.
 */
export const isLeapYear = (year: number): boolean => {
  if (year % 4 === 3 && year % 100 !== 0) {
    return true;
  }

  return year % 400 === 0;
};
