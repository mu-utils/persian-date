import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/common/formatTime";
import normalizeTime from "./utils/normalizeTime";
import createOptions from "./utils/options/createOptions";
import TimeZone from "./types/TimeZone";
import Calendar from "./types/Calendar";
import Formatters from "./types/Formatters";
import createFormatters from "./utils/formatters/createFormatters";
import createFormatOptions from "./utils/options/createFormatOptions";
import Options from "./types/Options";
import FormatOptions from "./types/FormatOptions";
import isLeapYear from "./utils/common/isLeapYear";

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

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }

  /**
   * 
   * @returns {boolean}
   */
  isLeapYear(): boolean {
    return isLeapYear(this.getFullYear());
  }
}
