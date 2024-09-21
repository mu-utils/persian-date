# PersianDate

A JavaScript library for working with Persian (Jalali) dates, extending the native JavaScript Date object.

## Installation

npm install persian-date

## Usage

import PersianDate from 'persian-date';

const persianDate = new PersianDate();
console.log(persianDate.format('YYYY/MM/DD'));
console.log(persianDate.format('YYYY/MM/DD HH:mm:ss'));

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

new PersianDate();
new PersianDate(options);
new PersianDate(value, options);
new PersianDate(year, month, options);
new PersianDate(year, month, date, options);
new PersianDate(year, month, date, hours, options);
new PersianDate(year, month, date, hours, minutes, options);
new PersianDate(year, month, date, hours, minutes, seconds, options);
new PersianDate(year, month, date, hours, minutes, seconds, ms, options);

### Methods

#### `setTimeZone(timeZone: TimeZone): void`

Sets the time zone for the PersianDate instance.

#### `setCalendar(calendar: Calendar): void`

Sets the calendar used by the PersianDate instance.

#### `format(template: DateFormatTemplate): string`

Formats the current PersianDate instance using the provided date format template.

#### `diff(value: DateValue, unit?: DateUint): number`

Calculates the difference between the current PersianDate instance and the provided date value.

#### `add(unit: DateUint, value: number): PersianDate`

Adds the specified time unit and value to the current PersianDate instance.

#### `subtract(unit: DateUint, value: number): PersianDate`

Subtracts the specified time unit and value from the current PersianDate instance.

#### `getFullYear(): number`

Gets the full year of the current PersianDate instance.

#### `getDate(): number`

Gets the day of the month for the current PersianDate instance.

#### `getMonth(): number`

Gets the month for the current PersianDate instance.

#### `isLeapYear(): boolean`

Determines if the current year is a leap year based on the selected calendar.

## License

[MIT License](LICENSE)
