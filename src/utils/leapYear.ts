import {
  PERSIAN_LEAP_YEAR_ADJUSTMENT,
  PERSIAN_LEAP_YEAR_DIVISOR,
  PERSIAN_LEAP_YEAR_MULTIPLIER,
} from "../constants/persianCalendar";

/**
 * Calculates the leap year factor for a given epoch year.
 * @param epochYear - The year in the epoch to check for leap year.
 */
export const getLeapYearFactor = (epochYear: number): number => {
  return Math.floor(
    (epochYear * PERSIAN_LEAP_YEAR_MULTIPLIER - PERSIAN_LEAP_YEAR_ADJUSTMENT) /
      PERSIAN_LEAP_YEAR_DIVISOR
  );
};

