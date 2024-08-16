import PersianCalendarConstants from "../PersianCalendarConstants";

export default class PersianDateUtils {
  static isValidPersianYear(year: number): boolean {
    return (
      year >= PersianCalendarConstants.MIN_PERSIAN_YEAR &&
      year <= PersianCalendarConstants.MAX_PERSIAN_YEAR
    );
  }

  static isValidPersianMonth(month: number): boolean {
    return month >= 1 && month <= 12;
  }

  /**
   * Determines whether the given Persian date is valid.
   *
   * The function checks if the year is within the valid range (1-9999), the
   * month is within the valid range (1-12), and the day is within the valid
   * range for the given month and year.
   */
  static isValidPersianDate(date: Date): boolean {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (
      !PersianDateUtils.isValidPersianYear(year) ||
      !PersianDateUtils.isValidPersianMonth(month)
    ) {
      return false;
    }

    const maxDaysInMonth =
      PersianCalendarConstants.PERSIAN_MONTHS_DAYS[month - 1];

    if (month === 12 && PersianDateUtils.isLeapYear(year)) {
      return day >= 1 && day <= 30; //? Esfand has 30 days in leap years
    }

    return day >= 1 && day <= maxDaysInMonth;
  }

  /**
   * Determines whether the given year is a leap year in the Persian calendar.
   *
   * The Persian calendar has a leap year every 4 years, except for years
   * divisible by 100 that are not divisible by 400.
   *
   * @param year - The year to check for leap year.
   */
  static isLeapYear(year: number): boolean {
    if (year % 4 === 3 && year % 100 !== 0) {
      return true;
    }

    return year % 400 === 0;
  }
}
