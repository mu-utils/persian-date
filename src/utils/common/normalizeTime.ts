import FormatOptions from "../../types/FormatOptions";
import Options from "../../types/Options";
import toGregorianTime from "../gregorian/toGregorianTime";
import { isPersianYear } from "../persian";
import isPersianTime from "../persian/isPersianTime";
import { toPersianTime } from "../persian/toPersianTime";
import localizeTime from "./localizeTime";

/**
 * Normalizes time to Gregorian or Persian date.
 *
 * If the input time is a valid Persian date and the calendar is set to
 * Persian, it returns the Persian date. If the input time is a valid Gregorian
 * date and the calendar is set to Gregorian, it returns the Gregorian date.
 * Otherwise, it converts between the two based on the specified calendar.
 *
 * @example
 * ```
 * normalizeTime(1727814600000, {
 *   calendar: "gregorian",
 *   invalidDateSeverity: "error"
 * }, { timeZone: "UTC" }); // Returns -17876258744000
 * ```
 *
 * @param {number} time - Time in milliseconds.
 * @param {Options} options - Options for handling invalid dates.
 * @param {FormatOptions} formatOptions - Options for formatting time, including calendar type and time zone.
 * @returns {number} Normalized time in milliseconds.
 * @throws Will throw an error if the time is invalid and `invalidDateSeverity` is set to "error".
 */
export default function normalizeTime(
  time: number,
  { invalidDateSeverity, calendar }: Options,
  { timeZone }: FormatOptions
): number {
  const localeTime = localizeTime(time, timeZone);
  const validPersianTime = isPersianTime(localeTime);

  if (
    isNaN(localeTime) ||
    (calendar === "persian" && !validPersianTime && isPersianYear(localeTime))
  ) {
    if (invalidDateSeverity === "error") {
      throw new Error("Invalid Date");
    }

    return NaN;
  }

  if (calendar === "gregorian") {
    return validPersianTime ? toGregorianTime(localeTime) : localeTime;
  }

  if (calendar === "persian") {
    return validPersianTime
      ? localeTime
      : toPersianTime(localeTime, { timeZone });
  }

  return NaN;
}
