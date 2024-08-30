import PersianCalendarConstants from "../constants/PersianCalendarConstants";

/**
 * Calculates the number of days in the given Persian year.
 */
export const calculateEpochBase = (year: number): number => {
  return (
    year -
    (year >= 0
      ? PersianCalendarConstants.BASE_YEAR
      : PersianCalendarConstants.BASE_YEAR - 1)
  );
};

/**
 * Calculates the number of days from the epoch to the given year.
 * @param epochBase - The number of years since the epoch.
 */
export const calculateEpochYear = (epochBase: number): number => {
  return (
    PersianCalendarConstants.BASE_YEAR +
    (epochBase % PersianCalendarConstants.YEAR_CYCLE)
  );
};

/**
 * Calculates the number of days from the epoch to the given epoch base.
 * @param epochBase - The number of years since the epoch.
 * @returns The number of days from the epoch to the given epoch base.
 */
export const getDaysFromCycleAndEpoch = (epochBase: number): number => {
  return (
    Math.floor(epochBase / PersianCalendarConstants.YEAR_CYCLE) *
      PersianCalendarConstants.TOTAL_DAYS_IN_2820_YEARS +
    (PersianCalendarConstants.EPOCH - 1)
  );
};
