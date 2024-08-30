import PersianDateOptions from "../types/PersianDateOptions";
import { toGregorianDate } from "./gregorianDate";
import { toPersianTime } from "./persianDate";
import validatePersianDate from "./validatePersianDate";

export default function normalizeTime(
  time: number,
  { calender, ignoreCalendar, invalidDateSeverity }: PersianDateOptions
): number {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (isNaN(year) && invalidDateSeverity === "error") {
    throw new Error("Invalid Date");
  }

  const isPersianDate = validatePersianDate(year, month, day);

  if (calender === "persian" && !isPersianDate) {
    return toPersianTime(date);
  }

  if (calender === "gregorian" && isPersianDate) {
    // const gDate = toGregorianDate(year, month, day);
    // gDate.setMilliseconds(date.getMilliseconds());

    // console.log(gDate, "gdtes");
  }

  return time;
}
