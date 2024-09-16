import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/common/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatTime from "./utils/formatters/formatTime";
import TimeZone from "./types/TimeZone";
import Calendar from "./types/Calendar";
import Formatters from "./types/Formatters";
import createFormatters from "./utils/formatters/createFormatters";
import Options from "./types/Options";
import FormatOptions from "./types/FormatOptions";
import isLeapYear from "./utils/common/isLeapYear";
import DateUint from "./types/DateUnit";
import getTime from "./utils/common/getTime";
import dffDates from "./utils/common/diffDates";
import DateValue from "./types/DateValue";
import DateType from "./types/DateType";
import modifyTime from "./utils/common/modifyTime";
import { DEFAULT_CALENDAR } from "./constants/defaultOptions";
import { toPersianDate } from "./utils/persian/toPersianDate";

/**
 * Represents a Persian date and time.
 * @extends Date
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 *
 * @example
 * ```
 * const persianDate = new PersianDate();
 * console.log(persianDate.format('YYYY/MM/DD'));
 * console.log(persianDate.format('YYYY/MM/DD HH:mm:ss'));
 * ```
 */
export default class PersianDate extends Date {
  private options: Options;
  private formatters!: Formatters;
  private formatOptions: FormatOptions;
  private persianDate!: DateType;

  constructor(options?: PersianDateOptions);
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

  private update() {
    this.formatters = createFormatters(this.formatOptions);
    this.persianDate = toPersianDate(this.getTime(), this.formatOptions);
  }

  /**
   * Sets the time zone for the PersianDate instance.
   *
   * This method updates the time zone in the format options and triggers
   * an update to reflect the new time zone settings.
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
   *
   * This method updates the calendar option and triggers an update to reflect
   * the new calendar settings.
   *
   * @param {Calendar} calendar - The calendar to set, either "gregorian" or
   * "persian".
   * @returns {void}
   */
  setCalendar(calendar: Calendar): void {
    this.options.calendar = calendar;
    this.formatOptions.calendar =
      calendar === "gregorian" ? undefined : DEFAULT_CALENDAR;
    this.update();
  }

  /**
   * Formats the current PersianDate instance using the provided date format
   * template.
   *
   * @param {DateFormatTemplate} template - The date format template to use for
   * formatting.
   * @returns {string} The formatted date string.
   */
  format(template: DateFormatTemplate): string {
    return formatTime(this.getTime(), template, this.formatters);
  }

  /**
   * Calculates the difference between the current PersianDate instance and the
   * provided date value.
   *
   * @param {DateValue} value - The date value to compare against.
   * @param {DateUint} [unit] - The time unit to use for the difference
   *   - "days"
   *   - "months"
   *   - "years"
   *   - "hours"
   *   - "minutes"
   *   - "seconds"
   *
   * calculation (e.g. 'days', 'months', 'years'). If not provided, the
   * difference will be calculated in milliseconds.
   * @returns {number} The difference between the current PersianDate instance
   * and the provided date value, in the specified time unit.
   */
  diff(value: DateValue, unit?: DateUint): number {
    return dffDates(this.getTime(), getTime(value), unit);
  }

  /**
   * Adds the specified time unit and value to the current PersianDate instance.
   *
   * @param {DateUint} unit - The time unit to add, such as "days", "months", or
   * "years".
   * @param {number} value - The value to add to the specified time unit.
   * @returns {PersianDate} The current PersianDate instance with the time
   * updated.
   */
  add(unit: DateUint, value: number): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, value));
    return this;
  }

  /**
   * Subtracts the specified time unit and value from the current PersianDate instance.
   *
   * @param {DateUint} unit - The time unit to subtract, such as "days", "months", or "years".
   * @param {number} value - The value to subtract from the specified time unit.
   * @returns {PersianDate} The current PersianDate instance with the time updated.
   */
  subtract(unit: DateUint, value: number): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, -value));
    return this;
  }

  /**
   * Gets the full year of the current PersianDate instance for the Persian calendar or
   * the Gregorian calendar year from the date instance.
   *
   * @returns {number} The full year of the current PersianDate instance.
   */
  getFullYear(): number {
    if (this.options.calendar === "gregorian") {
      return super.getFullYear();
    }

    return this.persianDate.year;
  }

  /**
   * Gets the day of the current PersianDate instance for the Persian calendar or
   * the Gregorian calendar day from the date instance.
   *
   * @returns {number} The day of the current PersianDate instance.
   */
  getDate(): number {
    if (this.options.calendar === "gregorian") {
      return super.getDate();
    }

    return this.persianDate.day;
  }

  /**
   * Gets the month of the current PersianDate instance for persian calendar or
   * gregorian calendar month from date instance.
   *
   * @returns {number} The month of the current PersianDate instance.
   */
  getMonth(): number {
    if (this.options.calendar === "gregorian") {
      return this.persianDate.month;
    }

    return super.getMonth();
  }

  /**
   * Determines if the current year is a leap year based on the specified calendar.
   *
   * @returns {boolean} `true` if the current year is a leap year; otherwise, `false`.
   *
   * @example
   * date.isLeapYear(); // Returns `true` if the year is a leap year.
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear(), this.options.calendar);
  }
}
