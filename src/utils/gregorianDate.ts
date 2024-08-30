import { GREGORIAN_EPOCH } from "../constants/gregorianCalendar";
import {
  PERSIAN_PASSED_DAYS_IN_MONTHS,
  PERSIAN_DAYS_IN_400_YEARS,
  PERSIAN_DAYS_IN_100_YEARS,
  PERSIAN_DAYS_IN_4_YEARS,
  PERSIAN_DAYS_IN_YEAR,
} from "../constants/persianCalendar";
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
  const passedDaysInMonth = PERSIAN_PASSED_DAYS_IN_MONTHS[month - 1];
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
  const wjd = Math.floor(totalGregorianDays + 0.5);
  const depoch = wjd - GREGORIAN_EPOCH;
  const year = calculateYear(depoch);
  const month = calculateMonth(wjd, year);
  const day = calculateDay(wjd, year, month);

  console.log(year, month, day);
  

  return new Date(year, month - 1, day);
};

/**
 * Calculates the day of the month for a given wjd, year, and month.
 * @param wjd - The day count.
 * @param year - The year.
 * @param month - The month.
 */
const calculateDay = (wjd: number, year: number, month: number): number =>
  wjd - dayFromYear(year) - dayInYear(year, month) + 1;

/**
 * Calculates the month for a given wjd and year.
 * @param wjd - The day count.
 * @param year - The year.
 */
const calculateMonth = (wjd: number, year: number): number => {
  let month = 1;
  while (wjd > dayFromYear(year) + dayInYear(year, month)) {
    month++;
  }
  return month;
};

/**
 * Calculates the year for a given day count since the epoch.
 * @param depoch - The day count since the epoch.
 */
const calculateYear = (depoch: number): number => {
  const quadricentCycles = Math.floor(depoch / PERSIAN_DAYS_IN_400_YEARS);
  const daysSinceQuadricent = depoch % PERSIAN_DAYS_IN_400_YEARS;

  const centCycles = Math.floor(
    daysSinceQuadricent / PERSIAN_DAYS_IN_100_YEARS
  );
  const daysSinceCent = daysSinceQuadricent % PERSIAN_DAYS_IN_100_YEARS;

  const quadCycles = Math.floor(daysSinceCent / PERSIAN_DAYS_IN_4_YEARS);
  const daysSinceQuad = daysSinceCent % PERSIAN_DAYS_IN_4_YEARS;

  const year =
    quadricentCycles * 400 +
    centCycles * 100 +
    quadCycles * 4 +
    Math.floor(daysSinceQuad / PERSIAN_DAYS_IN_YEAR);

  return year;
};
