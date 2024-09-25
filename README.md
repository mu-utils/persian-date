# PersianDate

A JavaScript library for working with Persian (Jalali) dates, extending the native JavaScript Date object.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API](#api)
  - [Constructor](#constructor)
  - [Methods](#methods)
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
- Extends the native JavaScript Date object
- Flexible date formatting
- Date manipulation (add, subtract)
- Date comparison and difference calculation
- Leap year detection

## API

### Constructor

The `PersianDate` constructor supports multiple overloads:

```javascript
new PersianDate();
new PersianDate(options);
new PersianDate(value, options);
new PersianDate(year, month, options);
new PersianDate(year, month, date, options);
new PersianDate(year, month, date, hours, options);
new PersianDate(year, month, date, hours, minutes, options);
new PersianDate(year, month, date, hours, minutes, seconds, options);
new PersianDate(year, month, date, hours, minutes, seconds, ms, options);
```

### Methods

#### `setTimeZone(timeZone: TimeZone): void`

Sets the time zone for the PersianDate instance.

#### `setCalendar(calendar: Calendar): void`

Sets the calendar used by the PersianDate instance.

#### `format(template: DateFormatTemplate): string`

Formats the current PersianDate instance using the provided date format template.

#### `diff(value: DateValue, unit?: DateUint): number`

Calculates the difference between the current PersianDate instance and the provided date value.

#### `add(value: number, unit: DateUint): PersianDate`

Adds the specified time unit and value to the current PersianDate instance.

#### `subtract(value: number, unit: DateUint): PersianDate`

Subtracts the specified time unit and value from the current PersianDate instance.

#### `getFullYear(): number`

Gets the full year of the current PersianDate instance.

#### `getDate(): number`

Gets the day of the month for the current PersianDate instance.

#### `getMonth(): number`

Gets the month for the current PersianDate instance.

#### `isLeapYear(): boolean`

Determines if the current year is a leap year based on the selected calendar.

## Algorithm

The conversion from Gregorian to Persian (Jalali) dates is based on an algorithm that involves the following steps:

1. **Ephemeris Base Calculation**: The base year is adjusted depending on whether the year is negative or positive.

   ```javascript
   const epbase = year - (year >= 0 ? 474 : 473);
   ```

2. **Ephemeris Year Calculation**: This determines the ephemeris year based on the adjusted base.

   ```javascript
   const epyear = 474 + mod(epbase, 2820);
   ```

3. **Day of Year Calculation**: The day of the year is computed by considering whether the month is within the first seven months or the latter five.

   ```javascript
   const dayOfYear =
     day + (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6);
   ```

4. **Total Days Calculation**: The total number of days is calculated based on the ephemeris year, accounting for leap years.

   ```javascript
   const yearDays = (epyear - 1) * 365;
   const leapYears = Math.floor(epbase / 2820) * 1029983;
   const leapYearDays = Math.floor((epyear * 682 - 110) / 2816);
   ```

5. **Leap Year Adjustment**: The algorithm checks if the current year is a leap year and makes necessary adjustments based on the month.
   ```javascript
   const isLeap = isPersianLeapYear(year);
   const extraDay = isLeap && month > 6 ? 1 : 0;
   ```

This algorithm ensures accurate conversion between the two calendar systems, handling the complexities of leap years and month lengths.

## Examples

### 1. Create a Persian Date Instance

Create an instance of `PersianDate` using the current date:

```javascript
import PersianDate from "@mu-utils/persian-date";

const currentDate = new PersianDate();
console.log(currentDate.format("YYYY/MM/DD")); // e.g., "1403/07/01"
```

### 2. Create a Persian Date with Specific Date

Create a Persian date using a specific year, month, and day:

```javascript
const specificDate = new PersianDate(1402, 12, 25);
console.log(specificDate.format("YYYY/MM/DD")); // e.g., "1402/12/25"
```

### 3. Format a Date

Format a Persian date instance using a custom template:

```javascript
const formattedDate = currentDate.format("YYYY/MM/DD HH:mm:ss");
console.log(formattedDate); // e.g., "1403/07/01 12:34:56"
```

### 4. Add Days to a Date

Add days to the current date:

```javascript
const futureDate = currentDate.add("days", 10);
console.log(futureDate.format("YYYY/MM/DD")); // e.g., "1403/07/11"
```

### 5. Subtract Months from a Date

Subtract months from a specific date:

```javascript
const pastDate = specificDate.subtract("months", 3);
console.log(pastDate.format("YYYY/MM/DD")); // e.g., "1402/09/25"
```

### 6. Calculate the Difference Between Dates

Calculate the difference in days between two dates:

```javascript
const anotherDate = new PersianDate(1403, 07, 01);
const daysDifference = anotherDate.diff(specificDate, "days");
console.log(`Difference in days: ${daysDifference}`); // e.g., "Difference in days: 90"
```

### 7. Check for Leap Year

Check if the current year is a leap year:

```javascript
const isLeap = currentDate.isLeapYear();
console.log(`Is the current year a leap year? ${isLeap}`); // e.g., "Is the current year a leap year? true"
```

## License

[MIT License](LICENSE)
