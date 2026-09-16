import PersianDate, {
  persianDate,
  gregorianToPersian,
  persianToGregorian,
  toPersianDigits,
  dayjsPlugin,
} from "../src/index";
import dayjs from "dayjs";

console.log("==================================================");
console.log("    @mu-utils/persian-date Comprehensive Demo     ");
console.log("==================================================");

// 1. Core PersianDate & persianDate Factory
const now = persianDate();
console.log("\n1. Current Persian Date:");
console.log("   Standard Format:", now.format("YYYY/MM/DD HH:mm:ss"));
console.log("   Persian Digits:", now.formatFa("YYYY/MM/DD HH:mm:ss"));
console.log("   Persian Weekday:", now.format("dddd"), `(Day index: ${now.getDayOfWeek()}, Weekend: ${now.isWeekend()})`);
console.log("   Persian Quarter:", `Q${now.quarter()}`);

// 2. High-Performance Pure Converters
console.log("\n2. Pure Integer Conversions (Persian <-> Gregorian):");
const [gy, gm, gd] = persianToGregorian(1403, 6, 12);
console.log(`   persianToGregorian(1403, 6, 12) -> [${gy}, ${gm}, ${gd}]`);
const [jy, jm, jd] = gregorianToPersian(gy, gm, gd);
console.log(`   gregorianToPersian(${gy}, ${gm}, ${gd}) -> [${jy}, ${jm}, ${jd}]`);

// 3. Relative Humanized Time (fromNow)
console.log("\n3. Relative Time (fromNow / toNow):");
const pastEvent = persianDate().subtract(3, "days");
const futureEvent = persianDate().add(2, "weeks");
console.log("   3 days ago:", pastEvent.fromNow());
console.log("   3 days ago (fa digits):", pastEvent.fromNow(false, { digits: "fa" }));
console.log("   2 weeks ahead:", futureEvent.fromNow());

// 4. Building a Real Persian Calendar Grid
console.log("\n4. Real Calendar Month Grid Example (Shahrivar 1403):");
const monthStart = persianDate("1403/06/01");
const daysInMonth = monthStart.daysInMonth();
const firstDayOfWeek = monthStart.getDayOfWeek(); // 0 = Saturday

console.log(`   Month: ${monthStart.format("MMMM YYYY")} | Days: ${daysInMonth} | Starting Weekday: ${firstDayOfWeek}`);
console.log("   ش   ی   د   س   چ   پ   ج");

let gridLine = "   ";
// Add empty spaces for leading days before the 1st of the month
for (let i = 0; i < firstDayOfWeek; i++) {
  gridLine += "    ";
}

for (let day = 1; day <= daysInMonth; day++) {
  const cellDate = persianDate(`1403/06/${String(day).padStart(2, "0")}`);
  const dayStr = toPersianDigits(String(day).padStart(2, " "));
  const isJomeh = cellDate.isWeekend();
  gridLine += `${dayStr}  `;

  if (cellDate.getDayOfWeek() === 6 || day === daysInMonth) {
    console.log(gridLine);
    gridLine = "   ";
  }
}

// 5. Day.js Plugin Comparison
console.log("\n5. Day.js Plugin Integration:");
dayjs.extend(dayjsPlugin);
const dj = dayjs("2024-09-02").calendar("jalali");
console.log("   Day.js with jalali plugin:", dj.format("jYYYY/jMM/jDD (dddd)"));
console.log("   Direct PersianDate (0 deps):", persianDate("2024-09-02").format("YYYY/MM/DD (dddd)"));

console.log("\n==================================================");
