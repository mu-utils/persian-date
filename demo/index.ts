import { persianDate } from "persian-date";

const a = persianDate("2024-09-02", { ignoreCalendar: false });

console.log(a.format("YYYY/MM/DD"));

// console.log(persianDate("2001/02/14").format("YYYY/MM/DD"));
