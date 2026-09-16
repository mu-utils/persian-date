import DateTuple from "../../types/DateTuple";

const G_D_M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

/**
 * Converts a Gregorian date (year, month 1-12, day 1-31) to a Persian date tuple [jy, jm, jd].
 * Uses single-step integer arithmetic (astronomical cycle).
 *
 * @param {number} gy - Gregorian year.
 * @param {number} gm - Gregorian month (1-12).
 * @param {number} gd - Gregorian day (1-31).
 * @returns {DateTuple} Persian date tuple of [year, month, day].
 */
export default function gregorianToPersian(
  gy: number,
  gm: number,
  gd: number
): DateTuple {
  if (gy < 0) {
    throw new Error("Invalid Date");
  }

  let jy = gy <= 1600 ? 0 : 979;
  let gYear = gy - (gy <= 1600 ? 621 : 1600);
  const gy2 = gm > 2 ? gYear + 1 : gYear;

  let days =
    365 * gYear +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) -
    80 +
    gd +
    G_D_M[gm - 1];

  jy += 33 * Math.floor(days / 12053);
  days %= 12053;

  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const jm =
    days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return [jy, jm, jd];
}
