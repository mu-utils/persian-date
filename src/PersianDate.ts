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
import createFormatters from "./utils/formatters/createFormatters";
import formatTime from "./utils/formatters/formatTime";
import { toPersianDate } from "./utils/persian/toPersianDate";

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
   *
   * Supports:
   * - No parameters (defaults to the current date and time).
   * - A Date object.
   * - A numeric timestamp.
   * - A date string.
   * - Year and month (for both Persian and Gregorian calendars).
   * - Year, month, and date.
   * - Year, month, date, and hours.
   * - Year, month, date, hours, and minutes.
   * - Year, month, date, hours, minutes, and seconds.
   * - Year, month, date, hours, minutes, seconds, and milliseconds.
   *
   * @example
   * const persianDate = new PersianDate(1400, 6, 12); // Persian calendar
   * const gregorianDate = new PersianDate(2021, 8, 3); // Gregorian calendar
   */
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
   * Adds the specified time unit and value to the current PersianDate instance.
   *
   * @param {DateUint} unit - The time unit to add (e.g., "days", "months", "years").
   * @param {number} value - The value to add to the specified time unit.
   * @returns {PersianDate} The updated PersianDate instance.
   */
  add(value: number, unit: DateUint): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, value));
    return this;
  }

  /**
   * Subtracts the specified time unit and value from the current PersianDate instance.
   *
   * @param {DateUint} unit - The time unit to subtract (e.g., "days", "months", "years").
   * @param {number} value - The value to subtract from the specified time unit.
   * @returns {PersianDate} The updated PersianDate instance.
   */
  subtract(value: number, unit: DateUint): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, -value));
    return this;
  }

  /**
   * Gets the full year of the current PersianDate instance.
   * For Persian calendar dates, it returns the year in the Persian calendar.
   * For Gregorian calendar dates, it returns the year in the Gregorian calendar.
   *
   * @returns {number} The year of the PersianDate instance.
   */
  getFullYear(): number {
    if (this.options.calendar === "gregorian") {
      return super.getFullYear();
    }

    return this.persianDate.year;
  }

  /**
   * Gets the day of the month for the current PersianDate instance.
   * Returns the day in the Persian calendar or the Gregorian calendar.
   *
   * @returns {number} The day of the PersianDate instance.
   */
  getDate(): number {
    if (this.options.calendar === "gregorian") {
      return super.getDate();
    }

    return this.persianDate.day;
  }

  /**
   * Gets the month for the current PersianDate instance. Returns the month in
   * the Persian calendar or the Gregorian calendar.
   *
   * @returns {number} The month of the PersianDate instance (0-based index).
   */
  getMonth(): number {
    if (this.options.calendar === "gregorian") {
      return this.persianDate.month;
    }

    return super.getMonth();
  }

  /**
   * Determines if the current year is a leap year based on the selected calendar.
   *
   * @returns {boolean} `true` if the current year is a leap year, `false` otherwise.
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear(), this.options.calendar);
  }
}
