import { PersianDate, persianDate } from "persian-date";

const persianDate1 = persianDate("2023-06-12T16:05:03", {
  calendar: "gregorian",
  timeZone: "America/New_York",
});

// console.log(new Date("2020-01-01T13:12:00"));

// console.log(date, new Date());

// console.log(new Date());

console.log(persianDate1.toLocaleDateString());
