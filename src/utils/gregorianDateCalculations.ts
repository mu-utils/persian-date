import GregorianCalendarConstants from "../constants/GregorianCalendarConstants";
import PersianCalendarConstants from "../constants/persianCalendar";
import PersianDate from "../PersianDate";
import { dayFromYear, dayInYear } from "./dateCalculations";
import {
  calculateEpochBase,
  calculateEpochYear,
  getDaysFromCycleAndEpoch,
} from "./epochCalculations";
import { getLeapYearFactor } from "./leapYear";

/**
 * Calculates the total number of Gregorian days for the given date.
 *
 * @param date - The date to calculate the total Gregorian days for.
 * @returns The total number of Gregorian days for the given date.
 */
export const getTotalGregorianDays = (date: PersianDate): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const epochBase = calculateEpochBase(year);
  const epochYear = calculateEpochYear(epochBase);
  const passedDaysInMonth =
    PersianCalendarConstants.PASSED_DAYS_IN_MONTHS[month - 1];
  const leapYearFactor = getLeapYearFactor(epochYear);
  const totalDaysInYears = (epochYear - 1) * 365;
  const daysFromCycleAndEpoch = getDaysFromCycleAndEpoch(epochBase);

  return (
    day +
    passedDaysInMonth +
    leapYearFactor +
    totalDaysInYears +
    daysFromCycleAndEpoch
  );
};

/**
 * Converts a PersianDate to a Gregorian Date.
 * @param date - The Persian date to convert.
 * @returns The corresponding Gregorian date.
 */
export const toGregorianDate = (date: PersianDate): Date => {
  const totalGregorianDays = getTotalGregorianDays(date);
  const wjd = totalGregorianDays - 1;
  const depoch = wjd - GregorianCalendarConstants.EPOCH;
  const year = calculateYear(depoch);
  const month = calculateMonth(wjd, year);
  const day = calculateDay(wjd, year, month);

  return new Date(year, month - 1, day);
};

/**
 * Calculates the day of the month for a given wjd, year, and month.
 * @param wjd - The day count.
 * @param year - The year.
 * @param month - The month.
 */
const calculateDay = (wjd: number, year: number, month: number): number => {
  return wjd - dayFromYear(year) - dayInYear(year, month) + 1;
};

/**
 * Calculates the month for a given wjd and year.
 * @param wjd - The day count.
 * @param year - The year.
 */
const calculateMonth = (wjd: number, year: number): number => {
  const yearday = wjd - dayFromYear(year);
  const leapAdjustment = wjd < dayFromYear(year + 1) ? 0 : 1;

  return Math.floor(((yearday + leapAdjustment) * 12 + 373) / 367);
};

/**
 * Calculates the year for a given day count since the epoch.
 * @param depoch - The day count since the epoch.
 */
const calculateYear = (depoch: number): number => {
  const quadricentCycles = Math.floor(
    depoch / PersianCalendarConstants.DAYS_IN_400_YEARS
  );
  const daysSinceQuadricent =
    depoch % PersianCalendarConstants.DAYS_IN_400_YEARS;

  const centCycles = Math.floor(
    daysSinceQuadricent / PersianCalendarConstants.DAYS_IN_100_YEARS
  );
  const daysSinceCent =
    daysSinceQuadricent % PersianCalendarConstants.DAYS_IN_100_YEARS;

  const quadCycles = Math.floor(
    daysSinceCent / PersianCalendarConstants.DAYS_IN_4_YEARS
  );
  const daysSinceQuad =
    daysSinceCent % PersianCalendarConstants.DAYS_IN_4_YEARS;

  const year =
    quadricentCycles * 400 +
    centCycles * 100 +
    quadCycles * 4 +
    Math.floor(daysSinceQuad / PersianCalendarConstants.DAYS_IN_YEAR);

  return year;
};
