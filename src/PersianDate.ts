import DateFormat from "./types/DateFormat";
import PersianDateOptions from "./types/PersianDateOptions";
import PersianDateArguments from "./types/PersianDateArguments";
import PersianDateUtils from "./utils/PersianDateUtils";

interface NormalizeArguments {
  props:
    | []
    | [value: Date | number | string]
    | [
        year: number,
        monthIndex: number,
        date?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        ms?: number
      ];
  options: PersianDateOptions | undefined;
}

export default class PersianDate extends Date {
  static readonly DEFAULT_OPTIONS: PersianDateOptions = {
    // calendar: "persian",
    // format: "YYYY/MM/DD",
    // locale: "fa-IR",
    // numberingSystem: "latn",
    // timeZone: "Asia/Tehran",
    ignoreCalendar: true,
  };
  private options: PersianDateOptions = PersianDate.DEFAULT_OPTIONS;

  constructor(...args: PersianDateArguments) {
    const { props, options } = PersianDate.normalizeArguments(args);

    super(...(props as [number | string | Date]));
    this.setOptions(options);
    this.normalizeDate();
  }
  private static normalizeArguments(
    args: PersianDateArguments
  ): NormalizeArguments {
    if (args.length === 1) {
      if (typeof args[0] === "object" && !(args[0] instanceof Date)) {
        return { props: [], options: args[0] };
      }

      return { props: args as [number | string | Date], options: undefined };
    }

    if (args.length === 8) {
      return {
        props: args.slice(0, 6) as [
          number,
          number,
          number,
          number,
          number,
          number
        ],
        options: args[6] as PersianDateOptions | undefined,
      };
    }

    return { props: [], options: undefined };
  }

  setOptions(options?: PersianDateOptions) {
    if (options) {
      this.options = { ...this.options, ...options };
    }
  }

  parse(s: string): number {
    throw new Error("Method not implemented.");
  }

  now(): number {
    throw new Error("Method not implemented.");
  }

  private normalizeDate() {
    if (!PersianDateUtils.isValidDate(this)) {
      if (!this.options.ignoreCalendar) {
        throw new Error("Invalid date");
      }

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
