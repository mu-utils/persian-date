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
export default function toGregorianTime(persianTime: number): number {
  const date = new Date(persianTime);
  const persianYear = date.getFullYear();
  const persianMonth = date.getMonth();
  const persianDay = date.getDate();
  const [gregorianYer, gregorianMonth, gregorianDay] = persianToGregorian(
    persianYear,
    persianMonth,
    persianDay
  );

  return new Date(
    gregorianYer,
    gregorianMonth,
    gregorianDay,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ).getTime();
}
