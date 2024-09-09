import DateTimeSegment from "../../types/DateTimeSegment";
import Formatters from "../../types/Formatters";

const formatter = (time: number) => (formatter: Intl.DateTimeFormat) =>
  formatter.format(time);

type DateTimeTuple = [
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
];

function extractDateTime(formattedDateTime: string): DateTimeTuple {
  const result = formattedDateTime.match(/\d+/g)?.map(Number);

  if (!result) {
    throw new Error("Invalid date");
  }

  return result as DateTimeTuple;
}

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
  [dateTime, longWeekday, shortWeekday, longMonth, shortMonth]: Formatters
): Record<DateTimeSegment, string> {
  const formatterFactory = formatter(time);
  const [year, month, day, hours, minutes, seconds] = extractDateTime(
    formatterFactory(dateTime)
  );
  const [h12, amPm] = [hours % 12 || 12, hours < 12 ? "am" : "pm"];

  console.log(longWeekday.resolvedOptions());

  return {
    YYYY: year.toString(),
    MM: padTwoDigits(month),
    DD: padTwoDigits(day),
    HH: padTwoDigits(hours),
    mm: padTwoDigits(minutes),
    ss: padTwoDigits(seconds),
    dddd: formatterFactory(longWeekday),
    MMM: formatterFactory(shortMonth),
    MMMM: formatterFactory(longMonth),
    YY: year.toString().slice(-2),
    D: day.toString(),
    ddd: formatterFactory(shortWeekday),
    Do: padTwoDigits(day),
    M: month.toString(),
    h: h12.toString(),
    a: amPm,
  };
}
