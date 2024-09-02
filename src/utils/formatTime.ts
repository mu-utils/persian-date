import PersianDate from "../PersianDate";
import Calendar from "../types/Calendar";
import DateFormatTemplate from "../types/DateFormatTemplate";
import DateTimeSegment from "../types/DateTimeSegment";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";

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
  { calender }: RequiredPersianDateOptions,
  template: DateFormatTemplate
) {
  let result = `${template}`;
  const replacements = createReplacements(time, calender);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
}

function createReplacements(
  time: number,
  calender: Calendar
): Record<DateTimeSegment, string> {
  const date = new Date(time);
  const hours = date.getHours();
  const month = date.getMonth() + 1;
  const stringHours = hours.toString();
  const stringMonth = month.toString();
  const stringYear = date.getFullYear().toString();
  const stringDate = date.getDate().toString();
  const localString = (_e: unknown) => ""; // todo: date.toPersianLocaleString.bind(date);

  return {
    YYYY: stringYear.toString(),
    MM: stringMonth.padStart(2, "0"),
    DD: stringDate.padStart(2, "0"),
    HH: stringHours.padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
    dddd: localString({ weekday: "long" }),
    MMM: localString({ month: "short" }),
    MMMM: localString({ month: "long" }),
    YY: stringYear.toString().slice(-2),
    D: stringDate,
    ddd: localString({ weekday: "short" }),
    Do: stringDate.padStart(2, "0"),
    M: stringMonth,
    h: stringHours,
    a: hours < 12 ? "am" : "pm",
  };
}
