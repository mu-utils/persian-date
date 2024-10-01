import TimeZone from "../../types/TimeZone";

/**
 *  Localizes time to the given time zone.
 * @example
 * ```
 * localizeTime(1727814600000, "America/New_York"); // 1727814600000
 * ```
 *
 * @param time - UTC time in milliseconds.
 * @param timeZone - Time zone.
 * @returns {number} Local time in milliseconds.
 */
export default function localizeTime(
  time: number,
  timeZone: TimeZone | undefined
): number {
  const date = new Date(time);
  console.log(date, "date date date");

  const localeTime = date.toLocaleString("en-US", { timeZone });

  const a = date.getMilliseconds();

  console.log(a, "millisecond");

  const newDate = new Date(localeTime);
  newDate.setMilliseconds(a);

  // console.log(localeTime, "localeTime localeTime localeTime");

  return newDate.getTime();
}
