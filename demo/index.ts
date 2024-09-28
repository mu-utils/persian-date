import PersianDate from "@mu-utils/persian-date";

// const p = new PersianDate("1403/06/12");

// console.log(p.format("YYYY/MM/D"), 'call');

const date = new PersianDate("1399/10/12");

console.log(date.format("YYYY-MM-DD"));

// console.log(p);

// const p1 = new PersianDate("2023-06-12T03:05:03", {
//   // calendar: "gregorian",
//   // timeZone: "America/New_York",
// });

// const p2 = new PersianDate("2023-06-11T03:05:03", {
//   calendar: "gregorian",
//   // timeZone: "America/New_York",
// });

// const date = new PersianDate("1403/06/12");

// console.log(date.getDate());

// persianDate1.setTimeZone("Asia/Tehran");
// console.log(persianDate1);
// persianDate1.setCalendar("persian");
// persianDate1.setCalendar("gregorian");

// p1.isLeapYear();

// console.log(p1.format("YYYY/MM/DD HH:mm:ss"));

// console.log(p1.format("YYYY/MM/DD HH:mm:ss"), p2.format("YYYY/MM/DD HH:mm:ss"));

// const d = new Date("2023-06-12T03:05:03");
// const b = new Date(d.toLocaleString("en-US", { timeZone: "America/New_York" }));
// console.log(d.toLocaleString(), b.toLocaleString());

// console.log(new Date("2020-01-01T13:12:00"));

// console.log(date, new Date());

// console.log(new Date());

// console.log(persianDate1.toLocaleString());

function julianDayToGregorian(julianDay: number) {
  const J2000 = 2451545.0; // Julian Day for 2000-01-01 12:00:00 UTC
  const JD_OFFSET = 0.5; // Offset to correct for Julian day to Gregorian conversion
  let Z = Math.floor(julianDay + JD_OFFSET);
  let F = julianDay + JD_OFFSET - Z;
  let A;

  if (Z >= 2299161) {
    const alpha = Math.floor((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - Math.floor(alpha / 4);
  } else {
    A = Z;
  }

  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  const day = B - D - Math.floor(30.6001 * E) + F;
  let month = E < 14 ? E - 1 : E - 13;
  let year = month > 2 ? C - 4716 : C - 4715;

  return {
    year: Math.floor(year),
    month: Math.floor(month),
    day: Math.floor(day),
  };
}

// Example usage:
const year = 1403;
const month = 6;
const day = 12;
const julianDay = jalaliToJulianDay(year, month, day);

// Example usage:
// const julianDay = 2459205.5; // Example Julian Day
const gregorianDate = julianDayToGregorian(julianDay);

console.log(
  new Date(
    gregorianDate.year,
    gregorianDate.month - 1,
    gregorianDate.day
  ).toLocaleString("fa-IR"),
  "sdfds"
);

console.log(
  `Gregorian Date: ${gregorianDate.year}-${gregorianDate.month}-${gregorianDate.day}`
);

function jalaliToJulianDay(year: number, month: number, day: number) {
  // Jalali calendar to Julian Day conversion constants
  const GREGORIAN_EPOCH = 1721425.5; // Julian day for 1/1/0001 AD (Gregorian calendar)
  const JALALI_EPOCH = 1948320.5; // Julian day for 3/19/622 AD (start of Jalali calendar)

  // Convert Jalali year, month, and day to Julian day
  let epbase, epyear;

  if (year >= 0) {
    epbase = year - 474;
  } else {
    epbase = year - 473;
  }

  epyear = 474 + (epbase % 2820);

  let jd = day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6);
  jd += Math.floor((epyear * 682 - 110) / 2816);
  jd += (epyear - 1) * 365 + Math.floor(epbase / 2820) * 1029983;
  jd += JALALI_EPOCH - 1;

  return jd;
}

import persianToJulianDay from "../../persian-date/src/__tests__/persianToJulianDay";
import p from "../src/utils/persian/persianToJulianDay";

console.log(
  persianToJulianDay(1404, 12, 12),
  jalaliToJulianDay(1404, 12, 12),
  p(1404, 12, 12)
);
