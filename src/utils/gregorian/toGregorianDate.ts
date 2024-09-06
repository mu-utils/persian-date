import persianToJulianDay from "../persian/persianToJulianDay";
import julianDayToGregorian from "./julianDayToGregorian";
import persianToGregorian from "./persianToGregorian";

/**
 * Converts a Persian date to Gregorian date. It returns converted date in
 * milliseconds and use input time as a base.
 *
 * @example
 * ```
 * toGregorianTime(1727814600000); // -17876258744000
 * ```
 *
 * @param persianTime - Persian date in milliseconds.
 * @returns Gregorian date in milliseconds.
 */
export default function toGregorianDate(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): Date {
  const julianDay = persianToJulianDay(persianYear, persianMonth, persianDay);

  return julianDayToGregorian(julianDay);
}
