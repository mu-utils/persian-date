import PersianDate from "@mu-utils/persian-date";

const p1 = new PersianDate("2023-06-12T03:05:03", {
  // calendar: "gregorian",
  // timeZone: "America/New_York",
});

const p2 = new PersianDate("2023-06-11T03:05:03", {
  calendar: "gregorian",
  // timeZone: "America/New_York",
});

const date = new PersianDate("1403/06/12");

console.log(date.getDate());

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
