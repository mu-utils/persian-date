import Calendar from "../../types/Calendar";
import calculatePersianLeapOffset from "../persian/calculatePersianLeapOffset";

/**
 * Determines if a given year is a leap year based on the specified calendar.
 *
 * @param {number} year - The year to check.
 * @param {Calendar} calendar - The calendar system ("gregorian" or "persian").
 * @returns {boolean} `true` if the year is a leap year; otherwise, `false`.
 */
export default function isLeapYear(year: number, calendar: Calendar): boolean {
  if (calendar === "persian") {
    return calculatePersianLeapOffset(year) === 0;
  }

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
