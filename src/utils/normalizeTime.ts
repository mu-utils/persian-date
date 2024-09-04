import { toPersianTime } from "./toPersianTime";
import toGregorianTime from "./toGregorianTime";
import validatePersianDate from "./validatePersianDate";
import Options from "../types/Options";
import FormatOptions from "../types/FormatOptions";

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
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (isNaN(year) && options.invalidDateSeverity === "error") {
    throw new Error("Invalid Date");
  }

  const isValidPersianDate = validatePersianDate(year, month, day);

  if (options.calendar === "persian" && !isValidPersianDate) {
    return toPersianTime(time, formatOptions);
  }

  if (options.calendar === "gregorian" && isValidPersianDate) {
    return toGregorianTime(time);
  }

  const newDate = date.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const newd = new Date(newDate);

  // console.log(newd, date);

  return new Date(newDate).getTime();
}
