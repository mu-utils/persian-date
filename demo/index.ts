import { PersianDate, persianDate } from "persian-date";

// const a = persianDate("2024-09-02", { ignoreCalendar: true });

// console.log(a.format("YYYY/MM/DD"), "SDddfdf");
// us timezone
// crate a date by us timezone
// const date = new PersianDate("2024-09-02", {
//   ignoreCalendar: true,
//   timeZone: "Asia/Tehran",
// });

const date = new PersianDate("1399/09/12T12:00:00", {
//   ignoreCalendar: true, 
//   timeZone: "Asia/Tehran",
});

console.log(date.getDate());

// console.log(persianDate("2001/02/14").format("YYYY/MM/DD"));
