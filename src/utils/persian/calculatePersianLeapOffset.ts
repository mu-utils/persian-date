import {
  PERSIAN_EPOCH_YEARS,
  PERSIAN_CYCLE_LENGTH,
  PERSIAN_LEAP_CYCLE,
} from "../../constants/calendarConstants";

/**
 * Calculates the leap offset for a given Persian year.
 *
 * @param {number} persianYear - Persian year.
 * @returns {number} The leap offset for the given year.
 */
export default function calculatePersianLeapOffset(
  persianYear: number
): number {
  if (
    persianYear < PERSIAN_EPOCH_YEARS[0] ||
    persianYear >= PERSIAN_EPOCH_YEARS[PERSIAN_EPOCH_YEARS.length - 1]
  ) {
    throw new Error(`Invalid Persian year ${persianYear}`);
  }

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

  const leap =
    (((yearDifference + 1) % PERSIAN_CYCLE_LENGTH) - 1) % PERSIAN_LEAP_CYCLE;

  return leap === -1 ? PERSIAN_LEAP_CYCLE : leap;
}
