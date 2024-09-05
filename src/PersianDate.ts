import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/common/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/common/formatTime";
import createOptions from "./utils/options/createOptions";
import TimeZone from "./types/TimeZone";
import Calendar from "./types/Calendar";
import Formatters from "./types/Formatters";
import createFormatters from "./utils/formatters/createFormatters";
import createFormatOptions from "./utils/options/createFormatOptions";
import Options from "./types/Options";
import FormatOptions from "./types/FormatOptions";
import isLeapYear from "./utils/common/isLeapYear";
import normalizeTime from "./utils/common/normalizeTime";
import DateUint from "./types/DateUnit";
import getTime from "./utils/common/getTime";
import dffDates from "./utils/common/diffDates";
import modifyTime from "./utils/common/modifytime";
import { toPersianDate } from "./utils/persian/toPersianDate";
import DateValue from "./types/DateValue";
import DateType from "./types/DateType";

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
    const [newArguments, options] = normalizeArguments(args);

    console.log(newArguments);
    


    super(...(newArguments as []));
    this.options = createOptions(options);
    this.formatOptions = createFormatOptions(options);
    this.update();
  }

  private update() {
    const time = normalizeTime(
      this.getTime(),
      this.options,
      this.formatOptions
    );
    this.setTime(time);
    this.persianDate = toPersianDate(time, this.formatOptions);
    this.formatters = createFormatters(this.formatOptions);
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

  setCalendar(calendar: Calendar) {
    this.options.calendar = calendar;
    this.formatOptions = createFormatOptions(this.options);
    this.update();
  }

  format(template: DateFormatTemplate): string {
    return formatDate(this.getTime(), template, this.formatters);
  }

  diff(value: DateValue, unit?: DateUint): number {
    return dffDates(this.getTime(), getTime(value), unit);
  }

  add(unit: DateUint, value: number): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, value));
    return this;
  }

  subtract(unit: DateUint, value: number): PersianDate {
    this.setTime(modifyTime(this.getTime(), unit, -value));
    return this;
  }

  getMonth(): number {
    return super.getMonth() + 1;
  }

  getFullYear(): number {
    // return super.getFullYear();
    return this.persianDate.year;
  }

  getDate(): number {
    return super.getDate();
  }

  /**
   * Determines if the current year is a leap year based on the specified calendar.
   *
   * @function
   * @returns {boolean} `true` if the current year is a leap year; otherwise, `false`.
   *
   * @example
   * // Assuming an instance `date` with a specified calendar:
   * date.isLeapYear(); // Returns `true` if the year is a leap year.
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear(), this.options.calendar);
  }
}
