import DateTuple from "../../types/DateTuple";
import {
  gregorianToJulianDayNumber,
  julianDayNumberToGregorian,
} from "../gregorian/julianDay";
import calculateMarchDay from "../gregorian/calculateMarchDay";
import calculatePersianLeapOffset from "./calculatePersianLeapOffset";

/**
 * Converts a Julian Day Number to a Persian date.
 * @param {number} jdn - The Julian Day Number.
 * @returns {object} The Persian date with properties year, month, and day.
 */
export default function julianDayNumberToPersian(jdn: number): DateTuple {
  const [gregorianYear, ..._rest] = julianDayNumberToGregorian(jdn);
  let persianYear = gregorianYear - 621;
  const dayInMarch = calculateMarchDay(persianYear);
  const leapOffset = calculatePersianLeapOffset(persianYear);
  let k = jdn - gregorianToJulianDayNumber(gregorianYear, 3, dayInMarch);

  let persianMonth, persianDay;

  if (k >= 0) {
    if (k <= 185) {
      persianMonth = 1 + Math.floor(k / 31);
      persianDay = (k % 31) + 1;
    } else {
      k -= 186;
      persianMonth = 7 + Math.floor(k / 30);
      persianDay = (k % 30) + 1;
    }
  } else {
    persianYear -= 1;
    k += 179;
    if (leapOffset === 1) k += 1;
    persianMonth = 7 + Math.floor(k / 30);
    persianDay = (k % 30) + 1;
  }

  return [persianYear, persianMonth, persianDay];
}
