import {
  PERSIAN_MAX_YEAR,
  PERSIAN_MIN_YEAR,
  PERSIAN_MONTHS_DAYS,
} from "../../constants/persianCalendar";
import isLeapYear from "../common/isLeapYear";

export function isPersianYear(year: number): boolean {
  return year >= PERSIAN_MIN_YEAR && year <= PERSIAN_MAX_YEAR;
}

function isPersianMonth(month: number): boolean {
  return month >= 1 && month <= 12;
}

function isPersianDay(year: number, month: number, day: number): boolean {
  const maxDaysInMonth = PERSIAN_MONTHS_DAYS[month - 1];

  if (month === 12 && isLeapYear(year, "persian")) {
    return day >= 1 && day <= 30; //? Esfand has 30 days in leap years
  }

  return day >= 1 && day <= maxDaysInMonth;
}

/**
 * Determines whether the given Persian date is valid.
 *
 * The function checks if the year is within the valid range (1200-1500), the
 * month is within the valid range (1-12), and the day is within the valid range
 * for the given month and year.
 */
const isValidPersian = (year: number, month: number, day: number): boolean =>
  isPersianYear(year) &&
  isPersianMonth(month) &&
  isPersianDay(year, month, day);

export default isValidPersian;
