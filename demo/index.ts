import PersianDate from "@mu-utils/persian-date";

const d1 = new Date();
console.log(d1, "d1");

const d2 = new PersianDate("2021/09/02 23:59:59.999");
console.log(d2, "d2");

// const d2 = julianDayToGregorian(persianToJulianDay(1403, 6, 12))
// console.log(d1);
// console.log(new Date(d2[0], d2[1] - 1, d2[2]));
