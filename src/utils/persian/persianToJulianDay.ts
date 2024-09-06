import { PERSIAN_EPOCH } from "../../constants/persianCalendar";
import isPersianLeapYear from "./isPersianLeapYear";

/**
 * Converts a Persian (Jalali) date to a Julian Day Number (JDN).
 * @param {number} year - Persian year.
 * @param {number} month - Persian month (1-12).
 * @param {number} day - Persian day of the month.
 * @returns {number} The Julian Day Number corresponding to the Persian date.
 *
 * Defines the Persian epoch and calculates the Julian Day Number by determining the base year
 * and year in the 2820-year cycle, then calculating the number of days up to the given date.
 * Takes leap years into account to adjust the day count.
 */
export default function persianToJulianDay(
  year: number,
  month: number,
  day: number
): number {
  const mod = (a: number, b: number): number => a % b;

  const epbase = year - (year >= 0 ? 474 : 473);
  const epyear = 474 + mod(epbase, 2820);

  const dayOfYear =
    day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6);

  const yearDays = (epyear - 1) * 365;
  const leapYears = Math.floor(epbase / 2820) * 1029983;
  const leapYearDays = Math.floor((epyear * 682 - 110) / 2816);

  const isLeap = isPersianLeapYear(year);
  const extraDay = isLeap && month > 6 ? 1 : 0;

  return (
    PERSIAN_EPOCH -
    1 +
    dayOfYear +
    yearDays +
    leapYears +
    leapYearDays +
    extraDay
  );
}
