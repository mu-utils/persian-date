import DateTuple from "../../types/DateTuple";
import persianToJulianDay from "../persian/persianToJulianDay";
import julianDayToGregorian from "./julianDayToGregorian";

/**
 * Converts a Persian date to Gregorian date.
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month.
 * @param {number} persianDay - Persian day.
 * @returns {DateTuple} Gregorian date in tuple of year, month, and day.
 */
export default function persianToGregorian(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): DateTuple {
  if (persianYear < 0) {
    throw new Error("Invalid Date");
  }
  const julianDay = persianToJulianDay(persianYear, persianMonth, persianDay);
  return julianDayToGregorian(julianDay);
}

