import DateFormat from "./types/DateFormat";
import PersianDateOptions from "./types/PersianDateOptions";
import PersianDateArguments from "./types/PersianDateArguments";
import PersianDateUtils from "./utils/PersianDateUtils";
import normalizeArguments from "./utils/normalizeArguments";
import DateValidationResult from "./constants/DateValidationResult";
import InvalidDate from "./utils/InvalidDate";

export default class PersianDate extends Date {
  private invalidDate!: InvalidDate;

  /**
   * this is a default options for PersianDate in the future some other configs will be add to this
   */
  static readonly DEFAULT_OPTIONS: PersianDateOptions = {
    ignoreCalendar: true,
    invalidDateSeverity: "default",
    timeZone: "Asia/Tehran",
  };
  private options: PersianDateOptions = PersianDate.DEFAULT_OPTIONS;

  constructor(...args: PersianDateArguments) {
    const { props, options } = normalizeArguments(args);
    super(...(props as [number | string | Date]));
    this.setOptions(options);
    this.normalizeDate();
  }

  setDate(date: number): number {
    return super.setDate(date);
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

  parse(s: string): number {
    throw new Error("Method not implemented.");
  }

  now(): number {
    throw new Error("Method not implemented.");
  }

  private normalizeDate() {
    const result = PersianDateUtils.validateDate(this);

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
    this.setDate(NaN);
  }

  /**
   * Converts the current date to a Persian date through locale string.
   */
  private toPersianDate() {
    const localeString = this.toFaIRLocaleString();
    const date = new PersianDate(localeString);
    this.setTime(date.getTime());
  }

  format(template: DateFormat): string {
    let result = `${template}`;
    const month = this.getMonth() + 1;
    const replacements: Record<string, string> = {
      YYYY: this.getFullYear().toString(),
      MM: month.toString().padStart(2, "0"),
      DD: this.getDate().toString().padStart(2, "0"),
    };

    for (const [key, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(key, "g"), value);
    }

    return result;
  }

  // Format date to Persian locale with Latin digits
  toFaIRLocaleString(options?: Intl.DateTimeFormatOptions): string {
    // if (this.isPersianCalendar()) {
    //   return this.toLocaleString(undefined, options);
    // }

    return this.toLocaleString("fa-IR-u-nu-latn", options);
  }

  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}
