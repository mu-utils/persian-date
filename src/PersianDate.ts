import PersianDateOptions from "./types/PersianDateOptions";
import normalizeArguments from "./utils/normalizeArguments";
import InvalidDate from "./utils/InvalidDate";
import DateFormatTemplate from "./types/DateFormatTemplate";
import formatDate from "./utils/formatDate";
import { toGregorianDate } from "./utils/gregorianDateCalculations";
import validatePersianDate from "./utils/validatePersianDate";
import DateValidationResult from "./constants/dateValidationResult";
import DEFAULT_OPTIONS from "./constants/defaultOptions";

export default class PersianDate extends Date {
  private invalidDate!: InvalidDate;

  private options: PersianDateOptions = DEFAULT_OPTIONS;

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
    this.normalizeDate();
  }

  setOptions(options?: PersianDateOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }

    this.createNewInvalidDate();
  }

  private createNewInvalidDate() {
    this.invalidDate = new InvalidDate(this.options.invalidDateSeverity!);
  }

  private normalizeDate() {
    const day = this.getDate();
    const month = this.getMonth();
    const year = this.getFullYear();
    const result = validatePersianDate(year, month, day);

    if (result === DateValidationResult.DATE_IS_INVALID) {
      this.throwException();
      return;
    }

    if (result === DateValidationResult.PERSIAN_DATE_IS_INVALID) {
      if (!this.options.ignoreCalendar) {
        this.throwException();
      } else {
        this.toPersianDate();
      }
    }
  }

  private throwException() {
    this.invalidDate.exception("Invalid Date");
    this.setTime(NaN);
  }

  /**
   * Converts the current date to a Persian date through locale string.
   */
  private toPersianDate() {
    const localeString = this.toPersianLocalString();
    const date = new PersianDate(localeString);
    this.setTime(date.getTime());
  }

  format(template: DateFormatTemplate): string {
    return formatDate(this, template);
  }

  toGregorianDate(): Date {
    return toGregorianDate(this);
  }

  // Format date to Persian locale with Latin digits
  toPersianLocalString(options?: Intl.DateTimeFormatOptions): string {
    return this.toLocaleString("fa-IR-u-nu-latn", options);
  }

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}
