import { PersianDate, persianDate } from "persian-date";

// const a = persianDate("2024-09-02", { ignoreCalendar: true });

// console.log(a.format("YYYY/MM/DD"), "SDddfdf");

const date = new PersianDate("2001/12/31 23:59:59.999");

console.log(date.getFullYear());

// console.log(persianDate("2001/02/14").format("YYYY/MM/DD"));
