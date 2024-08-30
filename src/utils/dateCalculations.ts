import GregorianCalendarConstants from "../constants/GregorianCalendarConstants";
import PersianCalendarConstants from "../constants/persianCalendar";
import PersianDate from "../PersianDate";
import {
  calculateEpochBase,
  calculateEpochYear,
  getDaysFromCycleAndEpoch,
} from "./epochCalculations";
import { getLeapYearFactor, isLeapYear } from "./leapYear";

/**
 * Calculates the day of the year for a given month in a given year.
 * @param year - The year.
 * @param month - The month.
 */
export const dayInYear = (year: number, month: number): number => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month > 2 && isLeapYear(year)) {
    return days[month - 1] + 1;
  }
  return days[month - 1];
};

/**
 * Calculates the day count from the beginning of the epoch year.
 * @param year - The year to calculate from.
 */
export const dayFromYear = (year: number): number => {
  return (
    (year - 1) * PersianCalendarConstants.DAYS_IN_YEAR +
    Math.floor((year - 1) / 4) -
    Math.floor((year - 1) / 100) +
    Math.floor((year - 1) / 400) +
    GregorianCalendarConstants.EPOCH
  );
};

/**
 * Calculates the passed days in months.
 * @returns An array of days passed in each month.
 */
export const getPassedDaysInMonths = (): number[] => {
  let sum = 0;
  return PersianCalendarConstants.MONTHS_DAYS.map((day) => {
    const passedDays = sum;
    sum += day;
    return passedDays;
  });
};
