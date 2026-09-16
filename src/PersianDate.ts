import { DEFAULT_CALENDAR } from "./constants/defaultOptions";
import Calendar from "./types/Calendar";
import DateFormatTemplate from "./types/DateFormatTemplate";
import DateType from "./types/DateType";
import DateUint from "./types/DateUnit";
import DateValue from "./types/DateValue";
import FormatOptions from "./types/FormatOptions";
import Formatters from "./types/Formatters";
import Options from "./types/Options";
import PersianDateOptions from "./types/PersianDateOptions";
import TimeZone from "./types/TimeZone";
import dffDates from "./utils/common/diffDates";
import getTime from "./utils/common/getTime";
import isLeapYear from "./utils/common/isLeapYear";
import modifyTime from "./utils/common/modifyTime";
import normalizeArguments from "./utils/common/normalizeArguments";
import toGregorianDate from "./utils/gregorian/toGregorianDate";
import createFormatters from "./utils/formatters/createFormatters";
import formatTime from "./utils/formatters/formatTime";
import overrideDisplayDateInstance from "./utils/formatters/overrideDisplayDateInstance";
import { toPersianDate } from "./utils/persian/toPersianDate";
import util from "util";

/**
 * Represents a Persian date and time, extending the native JavaScript Date object.
 * This class allows for the manipulation and formatting of dates in both the
 * Persian and Gregorian calendars.
 *
 * @extends Date
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 *
 * @example
 * const persianDate = new PersianDate();
 * console.log(persianDate.format('YYYY/MM/DD'));
 * console.log(persianDate.format('YYYY/MM/DD HH:mm:ss'));
 */
export default class PersianDate extends Date {
  private options: Options;
  private formatters!: Formatters;
  private formatOptions: FormatOptions;
  private persianDate!: DateType;

  /**
   * Multiple constructor overloads to support various input types
   * for initializing PersianDate instances.
   */
  constructor(options?: PersianDateOptions);
  constructor(value: DateValue, options?: PersianDateOptions);
  constructor(value: Date, options?: PersianDateOptions);
  constructor(value: number, options?: PersianDateOptions);
  constructor(value: string, options?: PersianDateOptions);
  constructor(year: number, month: number, options?: PersianDateOptions);
  constructor(
    year: number,
    month: number,
    date: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number,
    options?: PersianDateOptions
  );
  constructor(
    year: number,
    month: number,
    date: number,
    hours: number,
    minutes: number,
    seconds: number,
    ms: number,
    options?: PersianDateOptions
  );
  constructor(...args: unknown[]) {
    const [time, options, formatOptions] = normalizeArguments(args);
    super(time);
    this.options = options;
    this.formatOptions = formatOptions;
    this.update();
  }

  /**
   * Updates the internal state by creating new formatters and converting
   * the current time to a Persian date.
   *
   * @private
   */
  private update() {
    this.formatters = createFormatters(this.formatOptions);
    this.persianDate = toPersianDate(this.getTime(), this.formatOptions);
  }

  /**
   * Sets the time zone for the PersianDate instance.
   * Updates the time zone in the format options and re-calculates the date.
   *
   * @param {TimeZone} timeZone - The time zone to set (e.g., "UTC", "Asia/Tehran").
   * @returns {void}
   */
  setTimeZone(timeZone: TimeZone): void {
    this.formatOptions.timeZone = timeZone;
    this.update();
  }

  /**
   * Sets the calendar used by the PersianDate instance.
   * Updates the calendar option and re-calculates the date accordingly.
   *
   * @param {Calendar} calendar - The calendar to set (e.g., "gregorian" or "persian").
   * @returns {void}
   */
  setCalendar(calendar: Calendar): void {
    this.options.calendar = calendar;
    this.formatOptions.calendar =
      calendar === "gregorian" ? undefined : DEFAULT_CALENDAR;
    this.update();
  }

  /**
   * Formats the current PersianDate instance using the provided date format template.
   *
   * @param {DateFormatTemplate} template - The date format template to use.
   * @returns {string} The formatted date string.
   */
  format(template: DateFormatTemplate): string {
    return formatTime(this.getTime(), template, this.formatters);
  }

  /**
   * Calculates the difference between the current PersianDate instance and the provided date value.
   *
   * @param {DateValue} value - The date value to compare against.
   * @param {DateUint} [unit] - The time unit for the difference (e.g., "days", "months", "years").
   * @returns {number} The difference in the specified time unit or in milliseconds if no unit is provided.
   */
  diff(value: DateValue, unit?: DateUint): number {
    return dffDates(this.getTime(), getTime(value), unit);
  }

  /**
   * Checks if the current date is before another date.
   *
   * @param {DateValue} value - The date value to compare against.
   * @returns {boolean} `true` if this date is before the given date.
   */
  isBefore(value: DateValue): boolean {
    return this.getTime() < getTime(value);
  }

  /**
   * Checks if the current date is after another date.
   *
   * @param {DateValue} value - The date value to compare against.
   * @returns {boolean} `true` if this date is after the given date.
   */
  isAfter(value: DateValue): boolean {
    return this.getTime() > getTime(value);
  }

  /**
   * Checks if the current date is the same as another date, optionally matching a specific unit.
   *
   * @param {DateValue} value - The date value to compare against.
   * @param {DateUint | "year" | "month" | "day" | "hour" | "minute" | "second"} [unit] - Comparison unit.
   * @returns {boolean} `true` if the dates are the same.
   */
  isSame(
    value: DateValue,
    unit?: "year" | "month" | "day" | "hour" | "minute" | "second" | DateUint
  ): boolean {
    if (!unit) {
      return this.getTime() === getTime(value);
    }
    const other = new PersianDate(value as any, {
      calendar: this.options.calendar,
    });
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    switch (u) {
      case "year":
        return this.getFullYear() === other.getFullYear();
      case "month":
        return (
          this.getFullYear() === other.getFullYear() &&
          this.getMonth() === other.getMonth()
        );
      case "day":
        return (
          this.getFullYear() === other.getFullYear() &&
          this.getMonth() === other.getMonth() &&
          this.getDate() === other.getDate()
        );
      default:
        return (
          this.clone().startOf(unit as any).getTime() ===
          other.startOf(unit as any).getTime()
        );
    }
  }

  /**
   * Adds the specified time unit and value to the current PersianDate instance.
   *
   * @param {number} value - The value to add (or unit if passing unit first).
   * @param {DateUint} unit - The time unit to add (or value if passing value second).
   * @returns {PersianDate} The updated PersianDate instance.
   */
  add(value: number, unit: DateUint): PersianDate;
  add(unit: DateUint, value: number): PersianDate;
  add(arg1: number | DateUint, arg2: DateUint | number): PersianDate {
    const value = typeof arg1 === "number" ? arg1 : (arg2 as number);
    const unit = typeof arg1 === "string" ? arg1 : (arg2 as DateUint);
    this.setTime(modifyTime(this.getTime(), value, unit, this.options.calendar));
    return this;
  }

  /**
   * Subtracts the specified time unit and value from the current PersianDate instance.
   *
   * @param {number} value - The value to subtract (or unit if passing unit first).
   * @param {DateUint} unit - The time unit to subtract (or value if passing value second).
   * @returns {PersianDate} The updated PersianDate instance.
   */
  subtract(value: number, unit: DateUint): PersianDate;
  subtract(unit: DateUint, value: number): PersianDate;
  subtract(arg1: number | DateUint, arg2: DateUint | number): PersianDate {
    const value = typeof arg1 === "number" ? arg1 : (arg2 as number);
    const unit = typeof arg1 === "string" ? arg1 : (arg2 as DateUint);
    this.setTime(modifyTime(this.getTime(), -value, unit, this.options.calendar));
    return this;
  }

  /**
   * Gets the full year of the current PersianDate instance.
   * For Persian calendar dates, it returns the year in the Persian calendar.
   * For Gregorian calendar dates, it returns the year in the Gregorian calendar.
   *
   * @returns {number} The year of the PersianDate instance.
   */
  override getFullYear(): number {
    if (this.options.calendar === "gregorian") {
      return super.getFullYear();
    }

    return this.persianDate.year;
  }

  /**
   * Gets the day of the month for the current PersianDate instance.
   * Returns the day in the Persian calendar (1-31) or the Gregorian calendar (1-31).
   *
   * @returns {number} The day of the PersianDate instance.
   */
  override getDate(): number {
    if (this.options.calendar === "gregorian") {
      return super.getDate();
    }

    return this.persianDate.day;
  }

  /**
   * Gets the month for the current PersianDate instance.
   * Returns the month (1-12) in the Persian calendar or the Gregorian calendar.
   *
   * @returns {number} The 1-based month of the PersianDate instance (1-12).
   */
  override getMonth(): number {
    if (this.options.calendar === "gregorian") {
      return super.getMonth() + 1;
    }

    return this.persianDate.month;
  }

  /**
   * Sets the time of the PersianDate instance.
   *
   * @param {number} time - Number of milliseconds since January 1, 1970, 00:00:00 UTC.
   * @returns {number} The new timestamp.
   */
  override setTime(time: number): number {
    const result = super.setTime(time);
    this.update();
    return result;
  }

  /**
   * Sets the full year of the PersianDate instance.
   */
  override setFullYear(year: number, month?: number, date?: number): number {
    if (this.options.calendar === "gregorian") {
      const result = super.setFullYear(
        year,
        ...(month !== undefined ? [month - 1] : []),
        ...(date !== undefined ? [date] : [])
      );
      this.update();
      return result;
    }

    const m = month !== undefined ? month : this.persianDate.month;
    const d = date !== undefined ? date : this.persianDate.day;
    const newDate = toGregorianDate(year, m, d);
    newDate.setHours(
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    );
    return this.setTime(newDate.getTime());
  }

  /**
   * Sets the month of the PersianDate instance.
   */
  override setMonth(month: number, date?: number): number {
    if (this.options.calendar === "gregorian") {
      const result = super.setMonth(
        month - 1,
        ...(date !== undefined ? [date] : [])
      );
      this.update();
      return result;
    }

    const y = this.persianDate.year;
    const d = date !== undefined ? date : this.persianDate.day;
    const newDate = toGregorianDate(y, month, d);
    newDate.setHours(
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    );
    return this.setTime(newDate.getTime());
  }

  /**
   * Sets the date (day of month) of the PersianDate instance.
   */
  override setDate(date: number): number {
    if (this.options.calendar === "gregorian") {
      const result = super.setDate(date);
      this.update();
      return result;
    }

    const y = this.persianDate.year;
    const m = this.persianDate.month;
    const newDate = toGregorianDate(y, m, date);
    newDate.setHours(
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds()
    );
    return this.setTime(newDate.getTime());
  }

  override setHours(hours: number, min?: number, sec?: number, ms?: number): number {
    const result = super.setHours(
      hours,
      ...(min !== undefined ? [min] : []),
      ...(sec !== undefined ? [sec] : []),
      ...(ms !== undefined ? [ms] : [])
    );
    this.update();
    return result;
  }

  override setMinutes(min: number, sec?: number, ms?: number): number {
    const result = super.setMinutes(
      min,
      ...(sec !== undefined ? [sec] : []),
      ...(ms !== undefined ? [ms] : [])
    );
    this.update();
    return result;
  }

  override setSeconds(sec: number, ms?: number): number {
    const result = super.setSeconds(sec, ...(ms !== undefined ? [ms] : []));
    this.update();
    return result;
  }

  override setMilliseconds(ms: number): number {
    const result = super.setMilliseconds(ms);
    this.update();
    return result;
  }

  /**
   * Determines if the current year is a leap year based on the selected calendar.
   *
   * @returns {boolean} `true` if the current year is a leap year, `false` otherwise.
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear(), this.options.calendar);
  }

  /**
   * Returns a clone of the current PersianDate instance.
   */
  clone(): PersianDate {
    return new PersianDate(this.getTime(), {
      calendar: this.options.calendar,
      timeZone: this.formatOptions.timeZone,
      invalidDateSeverity: this.options.invalidDateSeverity,
    });
  }

  /**
   * Returns the number of days in the current month for the active calendar.
   */
  daysInMonth(): number {
    if (this.options.calendar === "gregorian") {
      return new Date(super.getFullYear(), super.getMonth() + 1, 0).getDate();
    }
    const month = this.getMonth();
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return this.isLeapYear() ? 30 : 29;
  }

  /**
   * Returns an array representation of the date: [year, month, date, hours, minutes, seconds, milliseconds].
   */
  toArray(): [number, number, number, number, number, number, number] {
    return [
      this.getFullYear(),
      this.getMonth(),
      this.getDate(),
      this.getHours(),
      this.getMinutes(),
      this.getSeconds(),
      this.getMilliseconds(),
    ];
  }

  /**
   * Sets the date to the start of a specified unit of time.
   */
  startOf(
    unit: "year" | "month" | "day" | "hour" | "minute" | "second" | DateUint
  ): this {
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    switch (u) {
      case "year":
        this.setMonth(1, 1);
        this.setHours(0, 0, 0, 0);
        break;
      case "month":
        this.setDate(1);
        this.setHours(0, 0, 0, 0);
        break;
      case "day":
        this.setHours(0, 0, 0, 0);
        break;
      case "hour":
        this.setMinutes(0, 0, 0);
        break;
      case "minute":
        this.setSeconds(0, 0);
        break;
      case "second":
        this.setMilliseconds(0);
        break;
    }
    return this;
  }

  /**
   * Sets the date to the end of a specified unit of time.
   */
  endOf(
    unit: "year" | "month" | "day" | "hour" | "minute" | "second" | DateUint
  ): this {
    const u = unit.endsWith("s") ? unit.slice(0, -1) : unit;
    switch (u) {
      case "year":
        this.setMonth(
          12,
          this.options.calendar === "persian"
            ? this.isLeapYear()
              ? 30
              : 29
            : 31
        );
        this.setHours(23, 59, 59, 999);
        break;
      case "month":
        this.setDate(this.daysInMonth());
        this.setHours(23, 59, 59, 999);
        break;
      case "day":
        this.setHours(23, 59, 59, 999);
        break;
      case "hour":
        this.setMinutes(59, 59, 999);
        break;
      case "minute":
        this.setSeconds(59, 999);
        break;
      case "second":
        this.setMilliseconds(999);
        break;
    }
    return this;
  }

  /**
   * Formats the PersianDate instance for console inspection.
   */
  [util.inspect.custom](): string {
    return overrideDisplayDateInstance(this.getTime());
  }
}

