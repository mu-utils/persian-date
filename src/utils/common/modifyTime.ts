import Calendar from "../../types/Calendar";
import DateUint from "../../types/DateUnit";
import { PERSIAN_MONTHS_DAYS } from "../../constants/persianCalendar";
import isPersianLeapYear from "../persian/isPersianLeapYear";
import { toPersianDate } from "../persian/toPersianDate";
import toGregorianDate from "../gregorian/toGregorianDate";

/**
 * Modifies a given timestamp by adding a specified value in the given time unit.
 *
 * @param {number} time - The timestamp (in milliseconds) to be modified.
 * @param {number} value - The amount to add in the specified time unit.
 * @param {DateUint} unit - The unit of time for modification.
 * @param {Calendar} [calendar="persian"] - The calendar system to use.
 * @returns {number} The new timestamp (in milliseconds) after modification.
 */
export default function modifyTime(
  time: number,
  value: number,
  unit: DateUint,
  calendar: Calendar = "gregorian"
): number {
  if (isNaN(time)) return NaN;

  const date = new Date(time);

  if (calendar === "persian" && (unit === "months" || unit === "years")) {
    const persian = toPersianDate(time, { calendar: "persian" });
    if (isNaN(persian.year)) return NaN;

    let newYear = persian.year;
    let newMonth = persian.month;

    if (unit === "years") {
      newYear += value;
    } else if (unit === "months") {
      const totalMonths = (persian.year * 12) + (persian.month - 1) + value;
      newYear = Math.floor(totalMonths / 12);
      newMonth = ((totalMonths % 12) + 12) % 12 + 1;
    }

    let maxDays = PERSIAN_MONTHS_DAYS[newMonth - 1];
    if (newMonth === 12 && isPersianLeapYear(newYear)) {
      maxDays = 30;
    }
    const newDay = Math.min(persian.day, maxDays);

    const newDate = toGregorianDate(newYear, newMonth, newDay);
    newDate.setHours(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
    return newDate.getTime();
  }

  switch (unit) {
    case "days":
      date.setDate(date.getDate() + value);
      break;
    case "months":
      date.setMonth(date.getMonth() + value);
      break;
    case "years":
      date.setFullYear(date.getFullYear() + value);
      break;
    case "hours":
      date.setHours(date.getHours() + value);
      break;
    case "minutes":
      date.setMinutes(date.getMinutes() + value);
      break;
    case "seconds":
      date.setSeconds(date.getSeconds() + value);
      break;
    default:
      throw new Error("Invalid unit");
  }

  return date.getTime();
}

