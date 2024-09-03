import PersianDateUtils from "../utils/PersianDateUtils";
import DateFormat from "../types/DateFormat";
import PersianDateOptions from "../types/PersianDateOptions";

type DateConstructorArgs =
  | []
  | [Date]
  | [number]
  | [string]
  | [number, number, number?, number?, number?, number?, number?];

new PersianDate();

export default class PersianDate extends Date {
  constructor(options?: PersianDateOptions);
  constructor(value: Date, options?: PersianDateOptions);
  constructor(value: number, options?: PersianDateOptions);
  constructor(value: string, options?: PersianDateOptions);
  constructor(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number,
    options?: PersianDateOptions
  );
  constructor(...args: ConstructorParameters<PersianDate>) {
    if (args.length === 0) {
      super();
    } else if (args.length === 1) {
      super(args[0]);
    } else {
      super(
        args[0] as number,
        args[1] as number,
        args[2],
        args[3],
        args[4],
        args[5],
        args[6]
      );
    }

    this.normalizeDate();
  }

  parse(s: string): number {
    throw new Error("Method not implemented.");
  }

  now(): number {
    throw new Error("Method not implemented.");
  }

  private normalizeDate() {
    if (!PersianDateUtils.isValidDate(this)) {
      this.toPersianDate();
    }
  }

  private toPersianDate() {
    const localeString = this.toFaIRLocaleString();
    const time = new PersianDate(localeString).getTime();
    this.setTime(time);
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
