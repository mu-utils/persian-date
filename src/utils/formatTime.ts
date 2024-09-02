import PersianDate from "../PersianDate";
import DateFormatTemplate from "../types/DateFormatTemplate";
import DateTimeSegment from "../types/DateTimeSegment";
import PersianDateOptions from "../types/PersianDateOptions";

/**
 * Formats a date. 
 * @param time 
 * @param options 
 * @param template 
 * @returns 
 */
export default function formatDate(
  time: number,
  options: PersianDateOptions,
  template: DateFormatTemplate
) {
  let result = `${template}`;
  const replacements = createReplacements(time);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
}

function createReplacements(time: number): Record<DateTimeSegment, string> {
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
