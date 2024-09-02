import { MILLISECONDS_PER_DAY, UNIX_EPOCH_JDN } from "../constants/timeConstants";
import { PERSIAN_EPOCH_YEARS } from "../constants/persianCalendar";

function gregorianToJulianDayNumber(
  gy: number,
  gm: number,
  gd: number | undefined
) {
  return (
    Math.floor(
      new Date(Date.UTC(gy, gm - 1, gd)).getTime() / MILLISECONDS_PER_DAY
    ) + UNIX_EPOCH_JDN
  );
}

function julianDayNumberToGregorian(jdn: number) {
  const date = new Date((jdn - UNIX_EPOCH_JDN) * MILLISECONDS_PER_DAY);
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function calculatePersianCalendar(jy: number) {
  if (
    jy < PERSIAN_EPOCH_YEARS[0] ||
    jy >= PERSIAN_EPOCH_YEARS[PERSIAN_EPOCH_YEARS.length - 1]
  )
    throw new Error(`Invalid Persian year ${jy}`);

  const gy = jy + 621;
  let leapJ = -14,
    jp = PERSIAN_EPOCH_YEARS[0];

  for (let i = 1; i < PERSIAN_EPOCH_YEARS.length; i++) {
    const jm = PERSIAN_EPOCH_YEARS[i];
    if (jy < jm) break;
    leapJ += Math.floor((jm - jp) / 33) * 8 + Math.floor(((jm - jp) % 33) / 4);
    jp = jm;
  }

  const n = jy - jp;
  leapJ += Math.floor(n / 33) * 8 + Math.floor(((n % 33) + 3) / 4);

  const leapG = Math.floor(gy / 4) - Math.floor(((gy / 100 + 1) * 3) / 4) - 150;
  const march = 20 + leapJ - leapG;

  const leap = (((n + 1) % 33) - 1) % 4;

  return { leapOffset: leap === -1 ? 4 : leap, year: gy, dayInMarch: march };
}

function persianToJulianDayNumber(jy: any, jm: number, jd: number) {
  const { year, dayInMarch } = calculatePersianCalendar(jy);
  const t = gregorianToJulianDayNumber(year, 3, dayInMarch) + (jm - 1) * 31;
  return t - Math.floor(jm / 7) * (jm - 7) + jd - 1;
}

function julianDayNumberToPersian(jdn: number) {
  const gy = julianDayNumberToGregorian(jdn).year;
  let jy = gy - 621;
  const { dayInMarch, leapOffset } = calculatePersianCalendar(jy);
  let k = jdn - gregorianToJulianDayNumber(gy, 3, dayInMarch);

  let jm, jd;
  if (k >= 0) {
    if (k <= 185) {
      jm = 1 + Math.floor(k / 31);
      jd = (k % 31) + 1;
    } else {
      k -= 186;
      jm = 7 + Math.floor(k / 30);
      jd = (k % 30) + 1;
    }
  } else {
    jy -= 1;
    k += 179;
    if (leapOffset === 1) k += 1;
    jm = 7 + Math.floor(k / 30);
    jd = (k % 30) + 1;
  }
  return { year: jy, month: jm, day: jd };
}

function gregorianToPersian(gy: any, gm: any, gd: any) {
  return julianDayNumberToPersian(persianToJulianDayNumber(gy, gm, gd));
}

function persianToGregorian(jy: any, jm: any, jd: any) {
  return julianDayNumberToGregorian(persianToJulianDayNumber(jy, jm, jd));
}

function isValidPersianDate(jy: number, jm: number, jd: number) {
  return (
    jy >= PERSIAN_EPOCH_YEARS[0] &&
    jy < PERSIAN_EPOCH_YEARS[PERSIAN_EPOCH_YEARS.length - 1] &&
    jm >= 1 &&
    jm <= 12 &&
    jd >= 1 &&
    jd <= getLastDayOfPersianMonth(jy, jm)
  );
}

function isPersianYearLeap(jy: any) {
  return calculatePersianCalendar(jy).leapOffset === 0;
}

function getLastDayOfPersianMonth(jy: any, jm: number) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return isPersianYearLeap(jy) ? 30 : 29;
}

export default {
  gregorianToJulianDayNumber,
  julianDayNumberToGregorian,
  calculatePersianCalendar,
  persianToJulianDayNumber,
  julianDayNumberToPersian,
  gregorianToPersian,
  persianToGregorian,
  isValidPersianDate,
  isPersianYearLeap,
  getLastDayOfPersianMonth,
};
