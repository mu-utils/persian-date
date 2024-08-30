import PersianDateUtils from "./PersianUtils/GregorianDateUtils";
import DateFormat from "./types/DateFormat";

export class PersianDate extends Date {
  constructor(date: Date | string | number = new Date()) {
    super(date);
    this.normalizeDate();
  }

  private normalizeDate() {
    if (!PersianDateUtils.isValidPersianDate(this)) {
      this.toPersianDate();
    }
  }

  private toPersianDate() {
    const localeString = this.toFaIRLocaleString();
    const time = new Date(localeString).getTime();
    this.setTime(time);
  }

  format(template: DateFormat): string {
    let result = `${template}`;
    const replacements: Record<string, string> = {
      YYYY: this.getFullYear().toString(),
      MM: this.getMonth().toString().padStart(2, "0"),
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

function persianDate(date?: PersianDate | string | number | Date): PersianDate {
  if (date instanceof PersianDate) {
    return new PersianDate(date.getTime());
  }

  if (
    typeof date === "string" ||
    typeof date === "number" ||
    date instanceof Date
  ) {
    return new PersianDate(date);
  }

  return new PersianDate(); // If no valid date is provided, return current date
}

export default persianDate;
