import calculateMarchDay from "./calculateMarchDay";
import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";
import calculateGregorianYear from "./calculateGregorianYear";

/**
 * Converts a Persian date to Julian Day Number.
 * @param {number} persianYear - The Persian year.
 * @param {number} persianMonth - The Persian month (1-based).
 * @param {number} persianDay - The Persian day of the month.
 * @returns {number} The Julian Day Number.
 */
export default function persianToJulianDayNumber(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): number {
  if (persianYear < 1) {
    throw new Error(`Invalid Date`);
  }

  const year = calculateGregorianYear(persianYear);
  const dayInMarch = calculateMarchDay(persianYear);
  const t =
    gregorianToJulianDayNumber(year, 3, dayInMarch) + (persianMonth - 1) * 31;

  return t - Math.floor(persianMonth / 7) * (persianMonth - 7) + persianDay - 1;
}
