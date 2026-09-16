import DateTuple from "../../types/DateTuple";
import {
  PERSIAN_DAYS_IN_400_YEARS,
  PERSIAN_DAYS_IN_100_YEARS,
  PERSIAN_DAYS_IN_4_YEARS,
  PERSIAN_DAYS_IN_YEAR,
  PERSIAN_EPOCH_OFFSET,
  PERSIAN_MONTHS_DAYS,
} from "../../constants/persianCalendar";

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

  const y = persianYear - PERSIAN_EPOCH_OFFSET;
  let j_day_no =
    PERSIAN_DAYS_IN_YEAR * y +
    Math.floor(y / 33) * 8 +
    Math.floor(((y % 33) + 3) / 4);

  for (let i = 0; i < persianMonth - 1; ++i) {
    j_day_no += PERSIAN_MONTHS_DAYS[i];
  }
  j_day_no += persianDay - 1;

  let g_day_no = j_day_no + 79;
  let gy = 1600 + 400 * Math.floor(g_day_no / PERSIAN_DAYS_IN_400_YEARS);
  g_day_no %= PERSIAN_DAYS_IN_400_YEARS;

  let leap = true;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * Math.floor(g_day_no / PERSIAN_DAYS_IN_100_YEARS);
    g_day_no %= PERSIAN_DAYS_IN_100_YEARS;

    if (g_day_no >= 365) {
      g_day_no++;
    } else {
      leap = false;
    }
  }

  gy += 4 * Math.floor(g_day_no / PERSIAN_DAYS_IN_4_YEARS);
  g_day_no %= PERSIAN_DAYS_IN_4_YEARS;

  if (g_day_no >= 366) {
    leap = false;
    g_day_no--;
    gy += Math.floor(g_day_no / PERSIAN_DAYS_IN_YEAR);
    g_day_no %= PERSIAN_DAYS_IN_YEAR;
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

