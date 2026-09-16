# @mu-utils/persian-date

[![npm version](https://img.shields.io/npm/v/@mu-utils/persian-date.svg?style=flat-square)](https://www.npmjs.com/package/@mu-utils/persian-date)
[![coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat-square)](https://github.com/mu-utils/persian-date)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg?style=flat-square)](package.json)

A modern, high-performance TypeScript/JavaScript library for working with Persian (Jalali / Shamsi) dates. It can be used as a **zero-dependency, ultra-lightweight standalone replacement for Day.js / Moment.js**, or as a **first-class Day.js plugin** (`jalaliday`).

---

## ✨ Features

- 🪶 **Zero Runtime Dependencies**: Ultra-lightweight core with 0 external dependencies.
- 🎯 **100% Test Coverage Across All Metrics**: 100% Statements, 100% Branches, 100% Functions, and 100% Lines verified.
- ⚡ **Why Replace Day.js / Moment with `persianDate`?**:
  - Native Persian-first calculations without requiring bloated plugin chains or Intl timezone workarounds.
  - Zero dependencies vs. Day.js + plugins + locale files.
  - Chainable, intuitive syntax: `persianDate('1403/06/12').add(1, 'week').formatFa()`.
  - Extends native `Date`: works directly with standard JS APIs, date pickers, React components, and JSON serializers.
- 🔄 **Pure Integer Calendar Converters**: Direct, ultra-fast `gregorianToPersian(gy, gm, gd)` and `persianToGregorian(jy, jm, jd)` without creating Date objects.
- 🔢 **Native Persian Digits Support**: Convert English digits to Persian (`۰-۹`) seamlessly with `.formatFa()` or `{ digits: "fa" }`.
- ⏱️ **Relative Time Humanizer (`fromNow`, `toNow`, `from`)**: Full Persian relative strings ("چند ثانیه پیش", "۳ روز پیش", "یک ماه بعد").
- 📅 **Calendar Helpers for Building Real UIs**:
  - `getDayOfWeek()`: Saturday (شنبه) = 0 .. Friday (جمعه) = 6.
  - `isWeekend()`: Checks if the day is Friday (جمعه).
  - `quarter()`: Persian quarters (Q1 Farvardin–Khordad to Q4 Dey–Esfand).
  - `startOf("week")` / `endOf("week")`: Snap directly to Saturday or Friday.
- 🗓️ **Accurate Astronomical Leap Years**: Uses the official Iranian 33-year solar cycle (correctly identifies **1403** as a leap year with 30 days in Esfand).

---

## 📦 Installation

```bash
# npm
npm install @mu-utils/persian-date

# yarn
yarn add @mu-utils/persian-date

# pnpm
pnpm add @mu-utils/persian-date
```

### Installing from GitHub Packages

If installing directly from **[GitHub Packages](https://github.com/mu-utils/persian-date/packages)**, add the following to your `.npmrc`:

```ini
@mu-utils:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

## 🚀 Converting Persian <-> Gregorian

High-performance, pure integer functions that run with zero object allocations:

```typescript
import { 
  gregorianToPersian, 
  persianToGregorian 
} from "@mu-utils/persian-date";

// Gregorian to Persian [year, month, day]
const [jy, jm, jd] = gregorianToPersian(2024, 9, 2);
console.log(jy, jm, jd); // 1403, 6, 12

// Persian to Gregorian [year, month, day]
const [gy, gm, gd] = persianToGregorian(1403, 6, 12);
console.log(gy, gm, gd); // 2024, 9, 2
```

You can also convert dynamically using `PersianDate` / `persianDate`:

```typescript
import { persianDate } from "@mu-utils/persian-date";

// From Gregorian Date string or Date object
const pDate = persianDate("2024-09-02");
console.log(pDate.format("YYYY/MM/DD")); // "1403/06/12"

// Switch calendar mode to Gregorian
pDate.setCalendar("gregorian");
console.log(pDate.format("YYYY/MM/DD")); // "2024/09/02"
```

---

## 💡 How to Use as a Lightweight Alternative to Day.js

Day.js requires loading multiple plugins (`utc`, `timezone`, `jalaliday`, `locale/fa`, `relativeTime`) to work with Persian dates, adding bundle size and configuration boilerplate.

With `@mu-utils/persian-date`, everything works **out of the box with zero dependencies**:

```typescript
import { persianDate } from "@mu-utils/persian-date";

// 1. Instantiation (mimics Day.js syntax)
const d = persianDate("1403/06/12 14:30:00");

// 2. Arithmetic (supports singular and plural units)
d.add(1, "week");      // adds 7 days
d.subtract(2, "months"); // subtracts 2 Persian months
d.add(3, "days");

// 3. Formatting with Persian Digits
console.log(d.format("YYYY/MM/DD"));    // "1403/04/22" (English digits)
console.log(d.formatFa("YYYY/MM/DD"));  // "۱۴۰۳/۰۴/۲۲" (Persian digits)
console.log(d.format("dddd DD MMMM"));  // "جمعه 22 تیر"

// 4. Relative Time
console.log(persianDate().subtract(3, "days").fromNow()); // "3 روز پیش"
console.log(persianDate().add(2, "hours").fromNow());     // "2 ساعت بعد"
console.log(persianDate().subtract(5, "minutes").fromNow(false, { digits: "fa" })); // "۵ دقیقه پیش"

// 5. Period Boundaries
const start = persianDate().startOf("week"); // Saturday 00:00:00
const end = persianDate().endOf("week");     // Friday 23:59:59.999
```

---

## 🎨 Building a Real Persian Calendar UI

Here is an example of generating a full month calendar grid (e.g. for React, Vue, Svelte, or Vanilla JS):

```typescript
import { persianDate, toPersianDigits } from "@mu-utils/persian-date";

export function generateMonthGrid(year: number, month: number) {
  const firstDay = persianDate(year, month, 1);
  const totalDays = firstDay.daysInMonth();
  const startingWeekday = firstDay.getDayOfWeek(); // 0 = شنبه, ..., 6 = جمعه

  const days = [];

  // Empty padding cells before 1st of month
  for (let i = 0; i < startingWeekday; i++) {
    days.push({ empty: true });
  }

  // Days of the month
  for (let day = 1; day <= totalDays; day++) {
    const date = persianDate(year, month, day);
    days.push({
      empty: false,
      dayNumber: day,
      dayNumberFa: toPersianDigits(day),
      isWeekend: date.isWeekend(), // Friday
      dateString: date.format("YYYY/MM/DD"),
      weekdayName: date.format("dddd"),
    });
  }

  return days;
}

// Example usage:
const grid = generateMonthGrid(1403, 6);
console.log(grid);
```

---

## 🔌 Day.js Plugin (`jalaliday` / `dayjsPlugin`)

If your codebase already uses Day.js, `@mu-utils/persian-date` is a 100% drop-in replacement:

```typescript
import dayjs from "dayjs";
import { jalaliday } from "@mu-utils/persian-date";

dayjs.extend(jalaliday);

// Current Jalali date
const now = dayjs().calendar("jalali");
console.log(now.format("YYYY/MM/DD HH:mm:ss")); // "1405/06/26 12:30:00"

// Parse Persian date
const custom = dayjs("1403/06/12", { jalali: true } as any);
console.log(custom.format("jYYYY/jMM/jDD (dddd)")); // "1403/06/12 (دوشنبه)"
console.log(custom.daysInMonth()); // 31
```

---

## 📖 Format Tokens

Tokens can be combined with bracketed text `[...]` to escape literals:

```typescript
persianDate.format("[امروز:] dddd DD MMMM YYYY [ساعت] HH:mm");
// "امروز: دوشنبه 12 شهریور 1403 ساعت 14:30"
```

| Token | Output Example | Description |
| :--- | :--- | :--- |
| `YYYY` / `jYYYY` | `1403` | 4-digit Persian year |
| `YY` / `jYY` | `03` | 2-digit Persian year |
| `MMMM` / `jMMMM` | `شهریور` | Full Persian month name |
| `MMM` / `jMMM` | `Shahrivar` / `فرو` | Transliterated or short month name |
| `MM` / `jMM` | `06` | 2-digit month (01–12) |
| `M` / `jM` | `6` | 1-digit month (1–12) |
| `DD` / `jDD` | `12` | 2-digit day of month (01–31) |
| `D` / `jD` | `12` | 1-digit day of month (1–31) |
| `dddd` | `دوشنبه` | Day of week (شنبه, یکشنبه, ...) |
| `ddd` | `د` | Short day of week |
| `HH` | `14` | 24-hour padded (00–23) |
| `H` | `14` / `9` | 24-hour single-digit (0–23) |
| `h` | `2` | 12-hour format (1–12) |
| `mm` | `30` | Minutes padded (00–59) |
| `m` | `30` / `5` | Minutes single-digit (0–59) |
| `ss` | `05` | Seconds padded (00–59) |
| `s` | `5` | Seconds single-digit (0–59) |
| `SSS` | `042` | Milliseconds (000–999) |
| `a` | `pm` / `am` | Ante / Post meridiem |
| `A` | `PM` / `AM` | Uppercase Ante / Post meridiem |
| `[...]` | `[Text]` | Escaped literal text |

---

## 📚 Complete API Reference

### Standalone Functions

- **`persianDate(...args): PersianDate`**: Factory function (supports all constructor overloads).
- **`gregorianToPersian(gy, gm, gd): [jy, jm, jd]`**: Pure integer conversion from Gregorian to Persian.
- **`persianToGregorian(jy, jm, jd): [gy, gm, gd]`**: Pure integer conversion from Persian to Gregorian.
- **`toPersianDigits(input: string | number): string`**: Replaces `0-9` with `۰-۹`.
- **`replacePersianNumbers(input: string): string`**: Replaces `۰-۹` with `0-9`.
- **`isPersianLeapYear(year: number): boolean`**: Checks if a Persian year is leap.
- **`relativeTime(fromTime, toTime, options?): string`**: Persian relative time generator.

### `PersianDate` Methods

#### Formatting
- **`format(template?: string, options?: { digits?: "en" | "fa" }): string`**: Formats date. Default template is `"YYYY/MM/DD"`.
- **`formatFa(template?: string): string`**: Formats directly with Persian digits.
- **`toArray(): [year, month, day, hour, min, sec, ms]`**: Returns date components.
- **`clone(): PersianDate`**: Returns a clone.

#### Calendar Helpers
- **`getDayOfWeek(): number`**: Persian weekday (0 = Saturday, 1 = Sunday, ..., 6 = Friday).
- **`isWeekend(): boolean`**: Returns `true` if the day is Friday.
- **`quarter(): number`**: Returns the Persian quarter (1–4).
- **`isLeapYear(): boolean`**: Returns `true` if current year is leap.
- **`daysInMonth(): number`**: Days in active month (31 for months 1–6, 30 for 7–11, 30/29 for Esfand).

#### Relative Time
- **`fromNow(withoutSuffix?, options?): string`**: e.g. `"۳ روز پیش"`.
- **`toNow(withoutSuffix?, options?): string`**: e.g. `"در ۳ روز"`.
- **`from(date, withoutSuffix?, options?): string`**: Relative time from another date.
- **`to(date, withoutSuffix?, options?): string`**: Relative time to another date.

#### Arithmetic & Boundaries
- **`add(value, unit)` / `add(unit, value)`**: Adds time. Units: `"year" | "years" | "month" | "months" | "week" | "weeks" | "day" | "days" | "hour" | "hours" | "minute" | "minutes" | "second" | "seconds"`.
- **`subtract(value, unit)` / `subtract(unit, value)`**: Subtracts time.
- **`startOf(unit)`**: Sets to beginning of `"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`.
- **`endOf(unit)`**: Sets to end of `"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`.

#### Comparisons
- **`isBefore(otherDate)`**: Checks if date is earlier.
- **`isAfter(otherDate)`**: Checks if date is later.
- **`isSame(otherDate, unit?)`**: Checks equality (optionally within `"year"`, `"month"`, `"day"`, etc.).
- **`diff(otherDate, unit?)`**: Difference in specified unit.

---

## 🔬 Leap Year Accuracy: 1403 vs 1404

Traditional algorithms (such as Ahmad Birashk's theoretical 2820-year cycle) erroneously placed the leap year at **1404** instead of **1403**. 

In the official astronomical calendar (and in Iranian civil calendars), **1403 is a leap year (Esfand has 30 days)**, and 1404 has 29 days. `@mu-utils/persian-date` uses the official 33-year solar cycle calculation:

```typescript
persianDate(1403, 12, 1).isLeapYear();   // true (30 days in Esfand 1403)
persianDate(1403, 12, 1).daysInMonth();  // 30

persianDate(1404, 12, 1).isLeapYear();   // false (29 days in Esfand 1404)
persianDate(1404, 12, 1).daysInMonth();  // 29
```

---

## 🧪 Testing

```bash
# Run all 16 test suites with 100% coverage
npm test -- --coverage

# Build bundles
npm run build

# Run demonstration
npm run demo
```

---

## 📄 License

[ISC](LICENSE) © Muhammad Zolfaghari
