import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/formatTime";
import normalizeTime from "./utils/normalizeTime";
import RequiredPersianDateOptions from "./types/RequiredPersianDateOptions";
import createOptions from "./utils/createOptions";
import createFormatter from "./utils/createFormatter";
import TimeZone from "./types/TimeZone";
import Calendar from "./types/Calendar";

export default class PersianDate extends Date {
  private options: RequiredPersianDateOptions;
  private formatter!: Intl.DateTimeFormat;

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
    this.setTime(normalizeTime(this.getTime(), this.options));
    this.updateFormatter();
  }

  // Update the formatter with current settings
  private updateFormatter() {
    this.formatter = createFormatter(this.options);
  }

  setTimeZone(timeZone: TimeZone) {
    this.options.timeZone = timeZone;
    this.updateFormatter();
  }

  setCalendar(calendar: Calendar) {
    this.options.calendar = calendar;
    this.updateFormatter();
  }

  format(template: DateFormatTemplate): string {
    return formatDate(this.getTime(), template, this.formatter);
  }

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}
