import DateTimeSegment from "../../types/DateTimeSegment";
import Formatters from "../../types/Formatters";
import replacePersianNumbers from "../persian/replacePersianNumbers";
import gregorianToPersian from "../gregorian/gregorianToPersian";

const padTwoDigits = (num: number) => num.toString().padStart(2, "0");

const defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Creates a map of replacements for the given date.
 * Uses pure integer fast-path for standard local dates,
 * and lazy getters for text month/weekday formatters.
 *
 * @param time - The date timestamp to format.
 * @param formatters - The formatters to use.
 * @returns The replacements map.
 */
export default function createFormatReplacements(
  time: number,
  [dateTime, longWeekday, shortWeekday, longMonth, shortMonth]: Formatters
): Record<DateTimeSegment, string> {
  const formatterFactory = (fmt: Intl.DateTimeFormat) => fmt.format(time);

  const resolved = dateTime.resolvedOptions();
  const isLocal = !resolved.timeZone || resolved.timeZone === defaultTimeZone;

  let year = 0;
  let month = 0;
  let day = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  const dateObj = new Date(time);

  if (isLocal && resolved.calendar === "persian") {
    const [y, m, d] = gregorianToPersian(
      dateObj.getFullYear(),
      dateObj.getMonth() + 1,
      dateObj.getDate()
    );
    year = y;
    month = m;
    day = d;
    hours = dateObj.getHours();
    minutes = dateObj.getMinutes();
    seconds = dateObj.getSeconds();
  } else {
    const parts = dateTime.formatToParts(time);
    for (const part of parts) {
      const val = parseInt(replacePersianNumbers(part.value), 10);
      if (part.type === "year") year = val;
      else if (part.type === "month") month = val;
      else if (part.type === "day") day = val;
      else if (part.type === "hour") hours = val;
      else if (part.type === "minute") minutes = val;
      else if (part.type === "second") seconds = val;
    }
  }

  const [h12, amPm] = [hours % 12 || 12, hours < 12 ? "am" : "pm"];
  const milliseconds = String(dateObj.getMilliseconds()).padStart(3, "0");
  const yearStr = year.toString();
  const yearShort = yearStr.slice(-2);
  const monthStr = month.toString();
  const monthPad = padTwoDigits(month);
  const dayStr = day.toString();
  const dayPad = padTwoDigits(day);

  return {
    YYYY: yearStr,
    MM: monthPad,
    DD: dayPad,
    HH: padTwoDigits(hours),
    H: hours.toString(),
    mm: padTwoDigits(minutes),
    m: minutes.toString(),
    ss: padTwoDigits(seconds),
    s: seconds.toString(),
    get dddd() {
      return formatterFactory(longWeekday);
    },
    get MMM() {
      return formatterFactory(shortMonth);
    },
    get MMMM() {
      return formatterFactory(longMonth);
    },
    YY: yearShort,
    D: dayStr,
    get ddd() {
      return formatterFactory(shortWeekday);
    },
    Do: dayPad,
    M: monthStr,
    h: h12.toString(),
    hh: padTwoDigits(h12),
    a: amPm,
    A: amPm.toUpperCase(),
    SSS: milliseconds,
    // Jalali token aliases
    jYYYY: yearStr,
    jYY: yearShort,
    get jMMMM() {
      return formatterFactory(longMonth);
    },
    get jMMM() {
      return formatterFactory(shortMonth);
    },
    jMM: monthPad,
    jM: monthStr,
    jDD: dayPad,
    jD: dayStr,
  };
}
