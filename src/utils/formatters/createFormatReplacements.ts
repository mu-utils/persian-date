import DateTimeSegment from "../../types/DateTimeSegment";
import Formatters from "../../types/Formatters";

const formatter = (formatter: Intl.DateTimeFormat, date: Date) =>
  formatter.format(date);

const padTwoDigits = (num: number) => num.toString().padStart(2, "0");

/**
 *
 * Creates a map of replacements for the given date.
 *
 *
 * This function creates replacements for the date. It takes a date and a
 * template and returns a formatted date. It uses the template to replace the
 * date with the corresponding value.
 *
 * @param time - The date to format.
 * @param formatters - The formatters to use.
 * @returns The replacements.
 */
export default function createFormatReplacements(
  time: number,
  [longWeekday, shortWeekday, longMonth, shortMonth]: Formatters
): Record<DateTimeSegment, string> {
  const date = new Date(time);
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
    dddd: formatter(longWeekday, date),
    MMM: formatter(shortMonth, date),
    MMMM: formatter(longMonth, date),
    YY: year.toString().slice(-2),
    D: day.toString(),
    ddd: formatter(shortWeekday, date),
    Do: padTwoDigits(day),
    M: month.toString(),
    h: h12.toString(),
    a: amPm,
  };
}
