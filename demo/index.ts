import { PersianDate } from "persian-date";

// const a = persianDate("2024-09-02", { ignoreCalendar: true });

// console.log(a.format("YYYY/MM/DD"), "SDddfdf");
// us timezoneط
// crate a date by us timezone
// const date = new PersianDate("2024-09-02", {
//   ignoreCalendar: true,
//   timeZone: "Asia/Tehran",
// });

const date = new PersianDate("2021-2-20", {
  ignoreCalendar: true,
  invalidDateSeverity: "default",
  //   timeZone: "Asia/Tehran",
});

console.clear();
console.log(date.toLocaleDateString());

// console.log(persianDate("2001/02/14").format("YYYY/MM/DD"));

// set america timezone

// const americaDate = new Date();
// americaDate.toLocaleString("en-US", { timeZone: "2" });
// console.log(americaDate);

