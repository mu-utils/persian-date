import { calculatePersianCalendar } from "./calculatePersianCalendar";
import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";

export const toPersianLocaleString = (date: Date): string =>
  date.toLocaleString("fa-IR-u-nu-latn");

export const toPersianTime = (value: Date | string | number): number =>
  new Date(toPersianLocaleString(new Date(value))).getTime();

/**
 * Converts a Persian date to Julian Day Number.
 * @param {number} persianYear - The Persian year.
 * @param {number} persianMonth - The Persian month (1-based).
 * @param {number} persianDay - The Persian day of the month.
 * @returns {number} The Julian Day Number.
 */
export function persianToJulianDayNumber(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): number {
  const { year, dayInMarch } = calculatePersianCalendar(persianYear);
  const t =
    gregorianToJulianDayNumber(year, 3, dayInMarch) + (persianMonth - 1) * 31;
  return t - Math.floor(persianMonth / 7) * (persianMonth - 7) + persianDay - 1;
}

