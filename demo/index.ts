import PersianDate from "../src/index";

console.log("=== PersianDate Demo ===");

const now = new PersianDate();
console.log("Current Persian Date:", now.format("YYYY/MM/DD HH:mm:ss"));
console.log("Full year:", now.getFullYear());
console.log("Month (1-12):", now.getMonth());
console.log("Day of month:", now.getDate());
console.log("Is leap year:", now.isLeapYear());

const custom = new PersianDate(1403, 6, 12, 12, 0, 0);
console.log("\nCustom date (1403/06/12):", custom.format("YYYY/MM/DD HH:mm:ss"));

custom.add(5, "days");
console.log("After adding 5 days:", custom.format("YYYY/MM/DD"));

custom.subtract("months", 1);
console.log("After subtracting 1 month:", custom.format("YYYY/MM/DD"));

const fromGregorian = new PersianDate("2021/01/02 23:59:59.999");
console.log("\nFrom Gregorian 2021/01/02:", fromGregorian.format("YYYY/MM/DD HH:mm:ss"));

// Day.js plugin demonstration
import dayjs from "dayjs";
import { dayjsPlugin } from "../src/index";

dayjs.extend(dayjsPlugin);
console.log("\n=== Day.js Plugin Demo ===");
const dj = dayjs().calendar("jalali");
console.log("Day.js Jalali current:", dj.format("YYYY/MM/DD HH:mm:ss"));
console.log("Day.js parsed Jalali:", dayjs("1403/06/12", { jalali: true } as any).format("YYYY/MM/DD (MMMM)"));
