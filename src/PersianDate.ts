import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/normalizeArguments";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/formatDate";
import { toGregorianDate } from "./utils/gregorianDate";
import validatePersianDate from "./utils/validatePersianDate";
import DEFAULT_OPTIONS from "./constants/defaultOptions";
import normalizeTime from "./utils/normalizeTime";

export default class PersianDate extends Date {
  options: PersianDateOptions = DEFAULT_OPTIONS;

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
    this.setOptions(options);
    this.normalizeTime();
  }

  setOptions(options?: PersianDateOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  private normalizeTime() {
    const time = this.getTime();
    this.setTime(normalizeTime(time, this.options));

    // if (result === DateValidationResult.DATE_IS_INVALID) {
    //   this.setTime(NaN);
    //   throwInvalidDateError(this.options.invalidDateSeverity);
    // }

    // if (result === DateValidationResult.PERSIAN_DATE_IS_INVALID) {
    //   if (!this.options.ignoreCalendar) {
    //     this.setTime(NaN);
    //     throwInvalidDateError(this.options.invalidDateSeverity);
    //   } else {
    //     this.toPersianDate();
    //   }
    // }
  }

  format(template: DateFormatTemplate): string {
    return formatDate(this, template);
  }

  toGregorianDate() {
    // return toGregorianDate(this);
  }

  // Format date to Persian locale with Latin digits
  toPersianLocaleString(options?: Intl.DateTimeFormatOptions): string {
    return this.toLocaleString("fa-IR-u-nu-latn", options);
  }

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}
