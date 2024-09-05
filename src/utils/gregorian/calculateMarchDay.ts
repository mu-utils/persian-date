import {
  PERSIAN_LEAP_CYCLE,
  PERSIAN_EPOCH_YEARS,
  PERSIAN_CYCLE_LENGTH,
} from "../../constants/calendarConstants";
import CalculatePersianCalendar from "../../types/CalculatePersianCalendar";
import toGregorianTime from "./toGregorianTime";
import calculateGregorianYear from "./calculateGregorianYear";

/**
 * Calculates Persian calendar details based on a given Persian year.
 * March day is calculated based on the Persian calendar's leap year rules.
 *
 * @param {number} persianYear - Persian year.
 * @returns {number} Persian calendar details.
 */
export default function calculateMarchDay(persianYear: number): number {
  const gregorianYear = calculateGregorianYear(persianYear);
  const leapPersian = calculateLeapPersian(persianYear);
  const leapGregorian =
    Math.floor(gregorianYear / PERSIAN_LEAP_CYCLE) -
    Math.floor(((gregorianYear / 100 + 1) * 3) / PERSIAN_LEAP_CYCLE) -
    150;

  return 20 + leapPersian - leapGregorian;
}

/**
 * Helper function to calculate the Persian leap year components.
 *
 * @param {number} persianYear - Persian year.
 * @returns {number} The calculated Persian leap year component.
 */
function calculateLeapPersian(persianYear: number): number {
  let leapPersian = -14;
  let persianEpochStart = PERSIAN_EPOCH_YEARS[0];

  for (let i = 1; i < PERSIAN_EPOCH_YEARS.length; i++) {
    const epochYear = PERSIAN_EPOCH_YEARS[i];
    if (persianYear < epochYear) break;
    leapPersian +=
      Math.floor((epochYear - persianEpochStart) / PERSIAN_CYCLE_LENGTH) * 8 +
      Math.floor(
        ((epochYear - persianEpochStart) % PERSIAN_CYCLE_LENGTH) /
          PERSIAN_LEAP_CYCLE
      );
    persianEpochStart = epochYear;
  }

  const yearDifference = persianYear - persianEpochStart;
  leapPersian +=
    Math.floor(yearDifference / PERSIAN_CYCLE_LENGTH) * 8 +
    Math.floor(
      ((yearDifference % PERSIAN_CYCLE_LENGTH) + 3) / PERSIAN_LEAP_CYCLE
    );

  return leapPersian;
}
