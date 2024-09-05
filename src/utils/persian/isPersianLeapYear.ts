import {
  PERSIAN_CYCLE_LENGTH,
  PERSIAN_LEAP_CYCLE,
} from "../../constants/calendarConstants";

/**
 * Checks if a given Persian year is a leap year.
 *
 * In the Persian calendar, leap years occur approximately every 4 years in a 33-year cycle,
 * but some additional adjustments are needed to account for the exact length of the solar year.
 *
 * @param {number} year - The Persian year to check.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
export default function isPersianLeapYear(year: number): boolean {
  // Calculate the number of complete cycles and the remainder
  const cyclePosition = year % PERSIAN_CYCLE_LENGTH;

  // In a 33-year cycle, leap years are distributed every 4 years
  return cyclePosition % PERSIAN_LEAP_CYCLE === 0;
}
