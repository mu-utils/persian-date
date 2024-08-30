import PersianDate from "../PersianDate";
import PersianDateOptions from "../types/PersianDateOptions";
import convertToPersianDate from "./convertToPersianDate";
import { toGregorianDate } from "./gregorianDateCalculations";
import validatePersianDate from "./validatePersianDate";

export default function normalizeTime(
  time: number,
  { calender, ignoreCalendar, invalidDateSeverity }: PersianDateOptions
): number {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const isPersianDate = validatePersianDate(year, month, day);

  if (calender === "persian" && !isPersianDate) {
    return convertToPersianDate(date).getTime();
  }

  if (calender === "gregorian" && isPersianDate) {
    // return toGregorianDate(year, month, day);
  }

  return time;
}
