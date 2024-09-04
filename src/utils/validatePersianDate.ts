import {
  PERSIAN_MIN_YEAR,
  PERSIAN_MAX_YEAR,
  PERSIAN_MONTHS_DAYS,
} from "../constants/persianCalendar";
import isPersianLeapYear from "./persian/isPersianLeapYear";

const isValidYear = (year: number): boolean =>
  year >= PERSIAN_MIN_YEAR && year <= PERSIAN_MAX_YEAR;

const isValidMonth = (month: number): boolean => month >= 1 && month <= 12;

const isValidDay = (day: number, year: number, month: number): boolean => {
  const maxDaysInMonth = PERSIAN_MONTHS_DAYS[month - 1];

  if (month === 12 && isPersianLeapYear(year)) {
    return day >= 1 && day <= 30; //? Esfand has 30 days in leap years
  }

  return day >= 1 && day <= maxDaysInMonth;
};

/**
 * Determines whether the given Persian date is valid.
 *
 * The function checks if the year is within the valid range (1200-1500), the
 * month is within the valid range (1-12), and the day is within the valid range
 * for the given month and year.
 */
export default function validatePersianDate(time: number): boolean {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    isValidYear(year) && isValidMonth(month) && isValidDay(day, year, month)
  );
}
