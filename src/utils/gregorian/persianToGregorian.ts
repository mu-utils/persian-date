import DateTuple from "../../types/DateTuple";

const GREGORIAN_MONTHS_DAYS = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

/**
 * Converts a Persian date to Gregorian date in single-step integer arithmetic.
 *
 * @param {number} persianYear - Persian year.
 * @param {number} persianMonth - Persian month (1-12).
 * @param {number} persianDay - Persian day (1-31).
 * @returns {DateTuple} Gregorian date in tuple of year, month, and day.
 */
export default function persianToGregorian(
  persianYear: number,
  persianMonth: number,
  persianDay: number
): DateTuple {
  if (persianYear < 0) {
    throw new Error("Invalid Date");
  }

  const y = persianYear - 979;
  let j_day_no =
    365 * y +
    ~~(y / 33) * 8 +
    ~~(((y % 33) + 3) / 4) +
    (persianMonth < 7 ? (persianMonth - 1) * 31 : (persianMonth - 7) * 30 + 186) +
    persianDay -
    1;

  let g_day_no = j_day_no + 79;
  let gy = 1600 + 400 * ~~(g_day_no / 146097);
  g_day_no %= 146097;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * ~~(g_day_no / 36524);
    g_day_no %= 36524;

    if (g_day_no >= 365) {
      g_day_no++;
    } else {
      leap = false;
    }
  }

  gy += 4 * ~~(g_day_no / 1461);
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += ~~(g_day_no / 365);
    g_day_no %= 365;
  }

  let i = 0;
  while (
    g_day_no >=
    GREGORIAN_MONTHS_DAYS[i] + (i === 1 && leap ? 1 : 0)
  ) {
    g_day_no -= GREGORIAN_MONTHS_DAYS[i] + (i === 1 && leap ? 1 : 0);
    i++;
  }
  const gm = i + 1;
  const gd = g_day_no + 1;

  return [gy, gm, gd];
}


