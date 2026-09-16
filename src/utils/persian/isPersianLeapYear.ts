import { PERSIAN_EPOCH_OFFSET } from "../../constants/persianCalendar";

/**
 * Checks if a given Persian (Jalali) year is a leap year.
 *
 * Uses the 33-year Jalali cycle calculation (matching official Iranian calendar):
 * leap years have 366 days (e.g. 1391, 1395, 1399, 1403, 1408).
 *
 * @param {number} year - Persian year.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
export default function isPersianLeapYear(year: number): boolean {
  const y = year - PERSIAN_EPOCH_OFFSET;
  const d1 = 365 * y + Math.floor(y / 33) * 8 + Math.floor(((y % 33) + 3) / 4);
  const d2 =
    365 * (y + 1) +
    Math.floor((y + 1) / 33) * 8 +
    Math.floor((((y + 1) % 33) + 3) / 4);
  return d2 - d1 === 366;
}
