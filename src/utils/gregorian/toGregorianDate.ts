import persianToGregorian from "./persianToGregorian";

/**
 * Converts a Persian date to a Gregorian Date instance.
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month.
 * @param {number} persianDay - Persian day.
 * @returns {Date} Gregorian Date object.
 */
export default function toGregorianDate(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): Date {
  const [year, month, day] = persianToGregorian(
    persianYear,
    persianMonth,
    persianDay
  );

  return new Date(year, month - 1, day);
}
