import {
  PERSIAN_BASE_YEAR,
  PERSIAN_YEAR_CYCLE,
  PERSIAN_TOTAL_DAYS_IN_2820_YEARS,
  PERSIAN_EPOCH,
} from "../constants/persianCalendar";

/**
 * Calculates the number of days in the given Persian year.
 */
export const calculateEpochBase = (year: number): number =>
  year - (year >= 0 ? PERSIAN_BASE_YEAR : PERSIAN_BASE_YEAR - 1);

/**
 * Calculates the number of days from the epoch to the given year.
 * @param epochBase - The number of years since the epoch.
 */
export const calculateEpochYear = (epochBase: number): number =>
  PERSIAN_BASE_YEAR + (epochBase % PERSIAN_YEAR_CYCLE);

/**
 * Calculates the number of days from the epoch to the given epoch base.
 * @param epochBase - The number of years since the epoch.
 * @returns The number of days from the epoch to the given epoch base.
 */
export const getDaysFromCycleAndEpoch = (epochBase: number): number =>
  Math.floor(epochBase / PERSIAN_YEAR_CYCLE) *
    PERSIAN_TOTAL_DAYS_IN_2820_YEARS +
  (PERSIAN_EPOCH - 1);
