import Calendar from "../../types/Calendar";
import calculateMarchDay from "../gregorian/calculateMarchDay";
import calculatePersianLeapOffset from "../persian/calculatePersianLeapOffset";

export default function isLeapYear(year: number, calendar: Calendar): boolean {
  if (calendar === "persian") {
    return calculatePersianLeapOffset(year) === 0;
  }

  return false;
}
