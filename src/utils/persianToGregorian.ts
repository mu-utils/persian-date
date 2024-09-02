/**
 * Converts a Persian date to Gregorian date.
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month.
 * @param {number} persianDay - Persian day.
 * @returns {object} Gregorian date.
 */
export function persianToGregorian(
  persianYear,
  persianMonth,
  persianDay
): number {
  const julianDayNumber = persianToJulianDayNumber(
    persianYear,
    persianMonth,
    persianDay
  );
  return julianDayNumberToGregorian(julianDayNumber);
}
