# PersianDate

A JavaScript/TypeScript library for working with Persian (Jalali) dates, extending the native JavaScript Date object.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API](#api)
  - [Constructor](#constructor)
  - [Methods](#methods)
  - [Format Template Tokens](#format-template-tokens)
- [Algorithm](#algorithm)
- [Examples](#examples)
- [License](#license)

## Installation

```bash
npm install @mu-utils/persian-date
```

## Usage

```javascript
import PersianDate from "@mu-utils/persian-date";

const persianDate = new PersianDate();
console.log(persianDate.format("YYYY/MM/DD"));
console.log(persianDate.format("YYYY/MM/DD HH:mm:ss"));
```

## Features

- Supports both Persian (Jalali) and Gregorian calendars
- Extends the native JavaScript `Date` object seamlessly
- Flexible date formatting with escaping support (`[Text] YYYY/MM/DD`)
- Calendar-aware date arithmetic (`add`, `subtract`) supporting flexible argument orders
- Date comparison and difference calculation across units (`diff`)
- Leap year detection for both Persian (astronomical 2820-year cycle) and Gregorian calendars
- Automatic state synchronization on date mutations (`setFullYear`, `setMonth`, `setDate`, `setTime`)

## API

### Constructor

The `PersianDate` constructor supports multiple overloads:

```typescript
new PersianDate();
new PersianDate(options?: PersianDateOptions);
new PersianDate(value: Date, options?: PersianDateOptions);
new PersianDate(value: number, options?: PersianDateOptions);
new PersianDate(value: string, options?: PersianDateOptions);
new PersianDate(year: number, month: number, options?: PersianDateOptions);
new PersianDate(year: number, month: number, date: number, options?: PersianDateOptions);
new PersianDate(year: number, month: number, date: number, hours: number, options?: PersianDateOptions);
new PersianDate(year: number, month: number, date: number, hours: number, minutes: number, options?: PersianDateOptions);
new PersianDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, options?: PersianDateOptions);
new PersianDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, ms: number, options?: PersianDateOptions);
```

### Methods

#### `format(template: DateFormatTemplate): string`

Formats the current PersianDate instance using the provided date format template. Supports escaping with square brackets (e.g. `[Today:] YYYY/MM/DD`).

#### `add(value: number, unit: DateUint): PersianDate`
#### `add(unit: DateUint, value: number): PersianDate`

Adds the specified time unit and value to the current date. Supports both `(value, unit)` and `(unit, value)` signatures. Units: `"years"`, `"months"`, `"days"`, `"hours"`, `"minutes"`, `"seconds"`.

#### `subtract(value: number, unit: DateUint): PersianDate`
#### `subtract(unit: DateUint, value: number): PersianDate`

Subtracts the specified time unit and value from the current date. Supports both `(value, unit)` and `(unit, value)` signatures.

#### `diff(value: DateValue, unit?: DateUint): number`

Calculates the difference between the current date and the provided date value in the specified unit (defaults to `"days"`).

#### `getFullYear(): number`

Gets the full year (Persian year when calendar is Persian, Gregorian year when calendar is Gregorian).

#### `getMonth(): number`

Gets the 1-based month index (1 to 12). 1 corresponds to Farvardin / January; 12 corresponds to Esfand / December.

#### `getDate(): number`

Gets the day of the month (1 to 31).

#### `isLeapYear(): boolean`

Determines if the current year is a leap year based on the active calendar.

#### `setTimeZone(timeZone: TimeZone): void`

Sets the time zone (e.g., `"Asia/Tehran"`, `"UTC"`).

#### `setCalendar(calendar: Calendar): void`

Sets the active calendar (`"persian"` or `"gregorian"`).

#### `clone(): PersianDate`

Returns a cloned `PersianDate` instance.

### Format Template Tokens

| Token | Output | Description |
| :--- | :--- | :--- |
| `YYYY` | 1403 | 4-digit year |
| `YY` | 03 | 2-digit year |
| `MMMM` | فروردین | Full month name |
| `MMM` | فرو | Short month name |
| `MM` | 06 | 2-digit month (01-12) |
| `M` | 6 | 1-digit month (1-12) |
| `DD` | 12 | 2-digit day of month (01-31) |
| `D` | 12 | 1-digit day of month (1-31) |
| `dddd` | دوشنبه | Full day of the week |
| `ddd` | د | Short day of the week |
| `HH` | 14 | 2-digit 24-hour format (00-23) |
| `h` | 2 | 12-hour format (1-12) |
| `mm` | 05 | 2-digit minute (00-59) |
| `ss` | 09 | 2-digit second (00-59) |
| `SSS` | 045 | 3-digit millisecond (000-999) |
| `a` | pm / am | Ante / Post meridiem |
| `[...]` | Text | Escaped literal text (e.g. `[تاریخ:]`) |

## Algorithm

The conversion between Gregorian and Persian (Jalali) calendars uses the Birashk 2820-year cycle algorithm with astronomical accuracy:
1. **Epoch Base Calculation**: Base year offset based on epoch cycles.
2. **Cycle Year**: Determining cycle coordinates within the 2820-year leap cycle.
3. **Julian Day Numbers (JDN)**: Bidirectional, continuous integer day mapping avoiding floating point rounding drifts.

## Examples

### 1. Create a Persian Date Instance

```javascript
import PersianDate from "@mu-utils/persian-date";

const currentDate = new PersianDate();
console.log(currentDate.format("YYYY/MM/DD")); // e.g., "1403/06/12"
```

### 2. Create a Persian Date with Specific Components

```javascript
const specificDate = new PersianDate(1402, 12, 29);
console.log(specificDate.format("YYYY/MM/DD")); // "1402/12/29"
```

### 3. Format with Time and Escaped Text

```javascript
const formatted = currentDate.format("[تاریخ:] YYYY/MM/DD [ساعت:] HH:mm:ss");
console.log(formatted);
```

### 4. Add Days or Months

```javascript
// Supports both (amount, unit) and (unit, amount)
const futureDate = currentDate.add(10, "days");
const nextMonth = currentDate.add("months", 1);
```

### 5. Subtract Time

```javascript
const pastDate = specificDate.subtract(3, "months");
console.log(pastDate.format("YYYY/MM/DD"));
```

### 6. Calculate Difference

```javascript
const date1 = new PersianDate(1402, 1, 1);
const date2 = new PersianDate(1402, 4, 1);
const diffInDays = date2.diff(date1, "days"); // 93
```

### 7. Check for Leap Year

```javascript
const date = new PersianDate(1403, 1, 1);
console.log(date.isLeapYear()); // true (1403 is a leap year in the official Iranian calendar)
const nonLeapDate = new PersianDate(1404, 1, 1);
console.log(nonLeapDate.isLeapYear()); // false
```

## Day.js Plugin Support (`jalaliday` / `dayjsPlugin`)

`@mu-utils/persian-date` comes with built-in first-class support for **[Day.js](https://day.js.org/)**! You do not need any external packages (such as `jalali-plugin-dayjs`).

### Quick Start with Day.js

```typescript
import dayjs from "dayjs";
import { dayjsPlugin } from "@mu-utils/persian-date";
// or: import { jalaliday } from "@mu-utils/persian-date";

dayjs.extend(dayjsPlugin);

// Format current date in Jalali
const now = dayjs().calendar("jalali");
console.log(now.format("YYYY/MM/DD HH:mm:ss")); // e.g. "1405/06/25 11:30:00"
console.log(now.format("DD MMMM YYYY"));        // e.g. "25 شهریور 1405"

// Parse a Persian date string
const custom = dayjs("1403/06/12", { jalali: true });
console.log(custom.format("YYYY/MM/DD")); // "1403/06/12"
console.log(custom.daysInMonth());        // 31

// Getters & Setters
console.log(custom.year());  // 1403
console.log(custom.month()); // 5 (0-indexed: 5 = Shahrivar)
console.log(custom.date());  // 12

// Arithmetic
const next = custom.add(5, "days");
console.log(next.format("YYYY/MM/DD")); // "1403/06/17"

// Start of / End of
console.log(custom.startOf("month").format("YYYY/MM/DD")); // "1403/06/01"
console.log(custom.endOf("year").format("YYYY/MM/DD"));   // "1403/12/30" (leap year)
```

### Global Jalali Calendar

You can set the default calendar globally for all Day.js instances:

```typescript
dayjs.calendar("jalali");

const date = dayjs("1403/06/12");
console.log(date.format("YYYY/MM/DD")); // "1403/06/12"

// Switch back to Gregorian when needed
dayjs.calendar("gregory");
```

## License

[ISC License](LICENSE)

