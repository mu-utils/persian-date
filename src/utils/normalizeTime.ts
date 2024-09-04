import { toPersianTime } from "./toPersianTime";
import toGregorianTime from "./toGregorianTime";
import validatePersianDate from "./validatePersianDate";
import Options from "../types/Options";
import FormatOptions from "../types/FormatOptions";
import TimeZone from "../types/TimeZone";

/**
 *
 * @param time
 * @param timeZone
 * @returns
 */
function localizeTime(time: number, timeZone: TimeZone | undefined) {
  const date = new Date(time);
  const localeTime = date.toLocaleString("en-US", { timeZone });
  return new Date(localeTime).getTime();
}

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
  const localizedTime = localizeTime(time, formatOptions.timeZone);

  if (isNaN(time) && options.invalidDateSeverity === "error") {
    throw new Error("Invalid Date");
  }

  const isValidPersianDate = validatePersianDate(localizedTime);

  if (options.calendar === "persian" && !isValidPersianDate) {
    return toPersianTime(localizedTime, formatOptions);
  }

  if (options.calendar === "gregorian" && isValidPersianDate) {
    return toGregorianTime(localizedTime);
  }

  return localizedTime;
}
