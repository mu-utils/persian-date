import { PERSIAN_EPOCH_YEARS } from "../constants/calendarConstants";
import CalculatePersianCalendar from "../types/CalculatePersianCalendar";
import gregorianToJulianDayNumber from "./gregorianToJulianDayNumber";

export const toPersianLocaleString = (date: Date): string =>
  date.toLocaleString("fa-IR-u-nu-latn");

export const toPersianTime = (value: Date | string | number): number =>
  new Date(toPersianLocaleString(new Date(value))).getTime();

/**
 * Converts a Persian date to Julian Day Number.
 * @param {number} persianYear - The Persian year.
 * @param {number} persianMonth - The Persian month (1-based).
 * @param {number} persianDay - The Persian day of the month.
 * @returns {number} The Julian Day Number.
 */
export function persianToJulianDayNumber(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): number {
  const { year, dayInMarch } = calculatePersianCalendar(persianYear);
  const t =
    gregorianToJulianDayNumber(year, 3, dayInMarch) + (persianMonth - 1) * 31;
  return t - Math.floor(persianMonth / 7) * (persianMonth - 7) + persianDay - 1;
}

/**
 * Calculates Persian calendar details based on a given Persian year.
 * March day is calculated based on the Persian calendar's leap year rules.
 *
 * @param {number} persianYear - Persian year.
 * @returns {object} Persian calendar details.
 */
export function calculatePersianCalendar(
  persianYear: number
): CalculatePersianCalendar {
  if (
    persianYear < PERSIAN_EPOCH_YEARS[0] ||
    persianYear >= PERSIAN_EPOCH_YEARS[PERSIAN_EPOCH_YEARS.length - 1]
  )
    throw new Error(`Invalid Persian year ${persianYear}`);

  const gregorianYear = persianYear + 621;
  let leapPersian = -14,
    persianEpochStart = PERSIAN_EPOCH_YEARS[0];

  for (let i = 1; i < PERSIAN_EPOCH_YEARS.length; i++) {
    const epochYear = PERSIAN_EPOCH_YEARS[i];
    if (persianYear < epochYear) break;
    leapPersian +=
      Math.floor((epochYear - persianEpochStart) / 33) * 8 +
      Math.floor(((epochYear - persianEpochStart) % 33) / 4);
    persianEpochStart = epochYear;
  }

  const yearDifference = persianYear - persianEpochStart;
  leapPersian +=
    Math.floor(yearDifference / 33) * 8 +
    Math.floor(((yearDifference % 33) + 3) / 4);

  const leapGregorian =
    Math.floor(gregorianYear / 4) -
    Math.floor(((gregorianYear / 100 + 1) * 3) / 4) -
    150;
  const marchDay = 20 + leapPersian - leapGregorian;

  const leap = (((yearDifference + 1) % 33) - 1) % 4;

  return {
    leapOffset: leap === -1 ? 4 : leap,
    year: gregorianYear,
    dayInMarch: marchDay,
  };
}
