# @mu-utils/persian-date

[![npm version](https://img.shields.io/npm/v/@mu-utils/persian-date.svg?style=flat-square)](https://www.npmjs.com/package/@mu-utils/persian-date)
[![coverage: 100%](https://img.shields.io/badge/coverage-100%25-brightgreen.svg?style=flat-square)](https://github.com/mu-utils/persian-date)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=flat-square)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg?style=flat-square)](package.json)

A modern, high-performance TypeScript/JavaScript library for working with Persian (Jalali / Shamsi) dates. It extends the native JavaScript `Date` object seamlessly and comes with **first-class built-in Day.js plugin support** as a drop-in replacement for `jalali-plugin-dayjs`.

---

## ✨ Features

- 🪶 **Zero Runtime Dependencies**: Ultra-lightweight core with zero dependencies.
- 🎯 **100% Test Coverage**: Fully verified with 100% branch, statement, function, and line coverage.
- 🧩 **Extends Native `Date`**: `new PersianDate() instanceof Date === true` — works directly with standard JavaScript APIs, date pickers, React components, and JSON serializers without conversion wrappers.
- ⚡ **Built-in Day.js Plugin (`jalaliday` / `dayjsPlugin`)**: Drop-in replacement for `jalali-plugin-dayjs` without installing extra packages.
- 🗓️ **Accurate Astronomical Leap Years**: Uses the official Iranian 33-year cycle (correctly identifies **1403** as a leap year where Esfand has 30 days).
- 🕒 **Full Date Arithmetic & Manipulation**: `.add()`, `.subtract()`, `.startOf()`, `.endOf()`.
- 🔍 **Intuitive Comparisons**: `.isBefore()`, `.isAfter()`, `.isSame()`, and `.diff()`.
- 🎨 **Flexible Formatting**: Rich token support (`YYYY`, `MMMM`, `dddd`, `HH:mm:ss`) with bracketed text escaping `[Today is] YYYY/MM/DD`.
- 🌐 **Time Zone & Dual-Calendar Aware**: Supports both Persian (`jalali`) and Gregorian calendars with timezone overrides (`Asia/Tehran`, `UTC`, etc.).

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

If installing directly from **[GitHub Packages](https://github.com/mu-utils/persian-date/packages)**, add the following to your project's `.npmrc`:

```ini
@mu-utils:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install normally:

```bash
npm install @mu-utils/persian-date
```

---

## 🚀 Quick Start

You can use this library in **two ways**:
1. **[Standalone `PersianDate`](#1-standalone-persiandate-no-dayjs-needed)** — Zero dependencies, no extra libraries needed.
2. **[Day.js Plugin](#2-dayjs-plugin-jalaliday--dayjsplugin)** — If your project already uses Day.js.

---

### 1. Standalone `PersianDate` (No Day.js needed!)

```typescript
import PersianDate from "@mu-utils/persian-date";

// Current date
const now = new PersianDate();
console.log(now.format("YYYY/MM/DD HH:mm:ss")); // e.g. "1405/06/25 12:30:00"
console.log(now.format("dddd DD MMMM YYYY"));   // e.g. "سه‌شنبه 25 شهریور 1405"

// Parse Persian date string
const date = new PersianDate("1403/06/12 14:30:00");
console.log(date.getFullYear()); // 1403
console.log(date.getMonth());    // 6 (1-indexed: Shahrivar)
console.log(date.getDate());     // 12

// Parse ISO UTC string (e.g. from backend API)
const apiDate = new PersianDate("2024-09-02T14:30:00.000Z");
console.log(apiDate.format("YYYY/MM/DD HH:mm:ss")); // "1403/06/12 18:00:00" (in Tehran UTC+3:30)

// Date Arithmetic
const nextWeek = date.add(7, "days");
console.log(nextWeek.format("YYYY/MM/DD")); // "1403/06/19"

const prevMonth = date.subtract(1, "month");
console.log(prevMonth.format("YYYY/MM/DD")); // "1403/05/12"

// Comparisons
console.log(date.isBefore(nextWeek)); // true
console.log(date.isAfter(nextWeek));  // false
console.log(date.isSame(new PersianDate("1403/06/12"), "day")); // true

// Boundaries
console.log(date.startOf("month").format("YYYY/MM/DD")); // "1403/06/01"
console.log(date.endOf("year").format("YYYY/MM/DD"));   // "1403/12/30" (1403 is leap)

// Month info
console.log(date.daysInMonth()); // 31
console.log(date.isLeapYear());  // true (1403 is a leap year)
```

---

### 2. Day.js Plugin (`jalaliday` / `dayjsPlugin`)

If you are currently using `dayjs` and `jalali-plugin-dayjs`, `@mu-utils/persian-date` provides a complete drop-in replacement:

```typescript
import dayjs from "dayjs";
import { jalaliday } from "@mu-utils/persian-date";
// or: import { dayjsPlugin } from "@mu-utils/persian-date";

dayjs.extend(jalaliday);

// Current date in Jalali
const now = dayjs().calendar("jalali");
console.log(now.format("YYYY/MM/DD HH:mm:ss")); // "1405/06/25 12:30:00"
console.log(now.format("DD MMMM YYYY"));        // "25 شهریور 1405"

// Parse Persian date string
const custom = dayjs("1403/06/12", { jalali: true } as any);
console.log(custom.format("YYYY/MM/DD")); // "1403/06/12"
console.log(custom.daysInMonth());        // 31
console.log(custom.year());               // 1403
console.log(custom.month());              // 5 (0-indexed)

// Arithmetic & Boundaries
console.log(custom.add(5, "days").format("YYYY/MM/DD"));      // "1403/06/17"
console.log(custom.startOf("month").format("YYYY/MM/DD"));    // "1403/06/01"
console.log(custom.endOf("year").format("YYYY/MM/DD"));      // "1403/12/30"

// Global Calendar setting
dayjs.calendar("jalali");
console.log(dayjs("1403/06/12").format("YYYY/MM/DD")); // "1403/06/12"
dayjs.calendar("gregory"); // Switch back
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
| `dddd` | `دوشنبه` | Day of week (e.g. شنبه, یکشنبه, ...) |
| `ddd` | `د` | Short day of week |
| `HH` | `14` | 24-hour format (00–23) |
| `h` | `2` | 12-hour format (1–12) |
| `mm` | `30` | Minutes (00–59) |
| `ss` | `05` | Seconds (00–59) |
| `SSS` | `042` | Milliseconds (000–999) |
| `a` | `pm` / `am` | Ante / Post meridiem |
| `[...]` | `[Text]` | Escaped literal text |

---

## 📚 API Reference (`PersianDate`)

### Constructor Overloads

```typescript
new PersianDate()                                          // Current date and time
new PersianDate("1403/06/12")                              // Persian date string
new PersianDate("2024-09-02T14:30:00.000Z")                // ISO 8601 string
new PersianDate(1725270600000)                             // Timestamp (ms)
new PersianDate(new Date())                                // Native Date instance
new PersianDate(1403, 6, 12)                               // year, month, day
new PersianDate(1403, 6, 12, 14, 30, 0, 0)                 // with hours, min, sec, ms
new PersianDate("1403/06/12", { timeZone: "Asia/Tehran" }) // with options
```

### Methods

#### Formatting & Conversion
- **`format(template: string): string`**: Formats the date using tokens.
- **`toArray(): [year, month, day, hour, min, sec, ms]`**: Returns components as a tuple.
- **`clone(): PersianDate`**: Creates a clone of the instance.

#### Getters & Setters
- **`getFullYear(): number`**: Returns the Persian year (or Gregorian if calendar set to Gregorian).
- **`getMonth(): number`**: Returns the 1-based month (1 to 12).
- **`getDate(): number`**: Returns the day of month (1 to 31).
- **`setFullYear(year, month?, date?): number`**: Sets year and updates components.
- **`setMonth(month, date?): number`**: Sets 1-based month.
- **`setDate(date): number`**: Sets day of month.

#### Arithmetic
- **`add(value: number, unit: DateUnit): PersianDate`** (or `add(unit, value)`): Adds time. Units: `"years"`, `"months"`, `"days"`, `"hours"`, `"minutes"`, `"seconds"`.
- **`subtract(value: number, unit: DateUnit): PersianDate`** (or `subtract(unit, value)`): Subtracts time.

#### Comparisons
- **`isBefore(otherDate: DateValue): boolean`**: Checks if current date is before `otherDate`.
- **`isAfter(otherDate: DateValue): boolean`**: Checks if current date is after `otherDate`.
- **`isSame(otherDate: DateValue, unit?: DateUnit): boolean`**: Checks if dates match (optionally within `"year"`, `"month"`, `"day"`, `"hour"`, etc.).
- **`diff(otherDate: DateValue, unit?: DateUnit): number`**: Computes the difference in the given unit.

#### Period Boundaries
- **`startOf(unit: "year" | "month" | "day" | "hour" | "minute" | "second"): this`**: Sets to the beginning of the period.
- **`endOf(unit: "year" | "month" | "day" | "hour" | "minute" | "second"): this`**: Sets to the end of the period.

#### Calendar & Leap Year
- **`isLeapYear(): boolean`**: Returns `true` if the year is a Persian leap year.
- **`daysInMonth(): number`**: Returns 31 for months 1–6, 30 for months 7–11, and 30 (leap) / 29 (non-leap) for Esfand.
- **`setCalendar(calendar: "persian" | "gregorian"): void`**: Switches between Persian and Gregorian modes.
- **`setTimeZone(timeZone: string): void`**: Sets time zone (e.g. `"Asia/Tehran"`, `"UTC"`).

---

## 🔬 Leap Year Accuracy: 1403 vs 1404

Traditional algorithms (such as Ahmad Birashk's theoretical 2820-year cycle) placed the leap year at **1404** instead of **1403**. 

In the official Iranian astronomical calendar (and in government civil calendars), **1403 is a leap year (Esfand has 30 days)**, and 1404 has 29 days. `@mu-utils/persian-date` uses the official 33-year solar cycle calculation, ensuring complete accuracy for contemporary and historical dates:

```typescript
new PersianDate(1403, 12, 1).isLeapYear();   // true (30 days in Esfand 1403)
new PersianDate(1403, 12, 1).daysInMonth();  // 30

new PersianDate(1404, 12, 1).isLeapYear();   // false (29 days in Esfand 1404)
new PersianDate(1404, 12, 1).daysInMonth();  // 29
```

---

## 🧪 Testing

This project adheres to strict quality standards with 100% test coverage:

```bash
# Run all tests with coverage
npm test -- --coverage

# Build bundles
npm run build

# Run interactive demo & benchmark
npm run demo
npx ts-node demo/benchmark.ts
```

---

## 📄 License

[ISC](LICENSE) © Muhammad Zolfaghari
