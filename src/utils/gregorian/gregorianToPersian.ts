import DateTuple from "../../types/DateTuple";

const G_D_M = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

/**
 * Converts a Gregorian date (year, month 1-12, day 1-31) to a Persian date tuple [jy, jm, jd].
 * Uses optimized single-step integer arithmetic (astronomical cycle).
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

  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    G_D_M[gm - 1];

  let jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;

  jy += 4 * ~~(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }

  const jm =
    days < 186 ? 1 + ~~(days / 31) : 7 + ~~((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);

  return [jy, jm, jd];
}

