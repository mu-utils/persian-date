import PersianDateUtils from "./PersianUtils/PersianDateUtils";

export class PersianDate extends Date {
  constructor(date: Date | string | number = new Date()) {
    super(date);
    this.normalizeDate();
  }

  private normalizeDate() {
    if (!PersianDateUtils.isValidPersianDate(this)) {
      PersianDateUtils.toGregorian(this);
    }
  }

  // Convert Persian digits to Latin digits
  private toPersianDigits(n: string): string {
    return n.replace(/[۰-۹]/g, (d) =>
      String(d.charCodeAt(0) - "۰".charCodeAt(0))
    );
  }

  // Format date to Persian locale with Latin digits
  toFaIRLocaleString(options?: Intl.DateTimeFormatOptions): string {
    // if (this.isPersianCalendar()) {
    //   return this.toLocaleString(undefined, options);
    // }

    return this.toLocaleString("fa-IR-u-nu-latn", options);
  }

  // Calculate the difference in time between two PersianDate instances
  diff(date: PersianDate): number {
    return Math.abs(this.getTime() - date.getTime());
  }
}

// Factory function to create and return a new PersianDate instance
function persianDate(date?: PersianDate | string | number | Date): PersianDate {
  // Convert the input to a valid Date or undefined
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
