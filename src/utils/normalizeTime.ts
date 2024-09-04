import { toPersianTime } from "./toPersianTime";
import toGregorianTime from "./toGregorianTime";
import validatePersianDate from "./validatePersianDate";
import Options from "../types/Options";
import FormatOptions from "../types/FormatOptions";
import localizeTime from "./localizeTime";

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
  options: Options,
  formatOptions: FormatOptions
): number {
  const localeTime = localizeTime(time, formatOptions.timeZone);

  if (isNaN(time) && options.invalidDateSeverity === "error") {
    throw new Error("Invalid Date");
  }

  const isValidPersianDate = validatePersianDate(localeTime);

  if (options.calendar === "persian" && !isValidPersianDate) {
    return toPersianTime(localeTime, formatOptions);
  }

  if (options.calendar === "gregorian" && isValidPersianDate) {
    return toGregorianTime(localeTime);
  }

  return localeTime;
}
