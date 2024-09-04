import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/formatTime";
import normalizeTime from "./utils/normalizeTime";
import createOptions from "./utils/options/createOptions";
import TimeZone from "./types/TimeZone";
import Calendar from "./types/Calendar";
import Formatters from "./types/Formatters";
import createFormatters from "./utils/createFormatters";
import createFormatOptions from "./utils/options/createFormatOptions";
import Options from "./types/Options";

export default class PersianDate extends Date {
  private options: Options;
  private formatters!: Formatters;
  private formatOptions: Intl.DateTimeFormatOptions;

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
    const normalizedTime = normalizeTime(
      this.getTime(),
      this.options,
      this.formatOptions
    );
    this.setTime(normalizedTime);
    this.updateFormatter();
  }

  // Update the formatter with current settings
  private updateFormatter() {
    this.formatters = createFormatters(this.formatOptions);
  }

  setTimeZone(timeZone: TimeZone) {
    this.formatOptions.timeZone = timeZone;
    this.updateFormatter();
  }

  setCalendar(calendar: Calendar) {
    this.options.calendar = calendar;
    this.updateFormatter();
  }

  format(template: DateFormatTemplate): string {
    return formatDate(this.getTime(), template, this.formatters);
  }

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}
