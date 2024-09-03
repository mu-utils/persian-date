import { toPersianTime } from "./toPersianTime";
import toGregorianTime from "./toGregorianTime";
import validatePersianDate from "./validatePersianDate";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";

/**
 * Normalizes time to gregorian or persian date.
 *
 *  If the input time is a valid persian date and the calender is set to
 *  persian, it returns persian date. Otherwise, it returns gregorian date.
 *  Otherwise, it returns gregorian date.
 *
 * @example
 * ```
 * normalizeTime(1727814600000, {
 *   calender: "gregorian",
 *   ignoreCalendar: true,
 *   invalidDateSeverity: "error"
 * }); // -17876258744000
 * ```
 * @param time - Time in milliseconds.
 * @param options - Options for normalizing time.
 * @returns Normalized time in milliseconds.
 */
export default function normalizeTime(
  time: number,
  { calendar, invalidDateSeverity }: RequiredPersianDateOptions
): number {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (isNaN(year) && invalidDateSeverity === "error") {
    throw new Error("Invalid Date");
  }

  const isValidPersianDate = validatePersianDate(year, month, day);

  if (calendar === "persian" && !isValidPersianDate) {
    return toPersianTime(time);
  }

  if (calendar === "gregorian" && isValidPersianDate) {
    return toGregorianTime(time);
  }

  return time;
}
