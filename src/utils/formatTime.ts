import PersianDate from "../PersianDate";
import Calendar from "../types/Calendar";
import DateFormatTemplate from "../types/DateFormatTemplate";
import DateTimeSegment from "../types/DateTimeSegment";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";
import gregorianFormatter from "./createGregorianFormatter";
import createPersianFormatter from "./createPersianFormatter";

/**
 * Formats a date. It takes a date and a template and returns a formatted date.
 * It uses the template to replace the date with the corresponding value.
 *
 * @example
 * ```
 * formatDate(122343942384, "YYYY-MM-DD"); // "2023-04-01"
 * ```
 *
 * @param time - The date to format.
 * @param options - The options to use.
 * @param template - The template to use.
 * @returns The formatted date.
 */
export default function formatDate(
  time: number,
  template: DateFormatTemplate,
  formatter: Intl.DateTimeFormat
) {
  let result = `${template}`;
  const replacements = createReplacements(time, formatter);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
}

function createReplacements(
  time: number,
  formatters: {
    longWeekday: Intl.DateTimeFormat;
    shortWeekday: Intl.DateTimeFormat;
    longMonth: Intl.DateTimeFormat;
    shortMonth: Intl.DateTimeFormat;
  }
): Record<DateTimeSegment, string> {
  const date = new Date(time);
  const padTwoDigits = (num: number) => num.toString().padStart(2, "0"); // Inline utility function
  const [hours, minutes, seconds, day, month, year] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];
  const [h12, amPm] = [hours % 12 || 12, hours < 12 ? "am" : "pm"];

  return {
    YYYY: year.toString(),
    MM: padTwoDigits(month),
    DD: padTwoDigits(day),
    HH: padTwoDigits(hours),
    mm: padTwoDigits(minutes),
    ss: padTwoDigits(seconds),
    dddd: formatters.longWeekday.format(date),
    MMM: formatters.shortMonth.format(date),
    MMMM: formatters.longMonth.format(date),
    YY: year.toString().slice(-2),
    D: day.toString(),
    ddd: formatters.shortWeekday.format(date),
    Do: padTwoDigits(day),
    M: month.toString(),
    h: h12.toString(),
    a: amPm,
  };
}

const padTwoDigits = (num: number): string => num.toString().padStart(2, "0");
