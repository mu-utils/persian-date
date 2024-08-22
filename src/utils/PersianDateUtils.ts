import PersianCalendarConstants from "../constants/PersianCalendarConstants";
import GregorianDateUtils from "./GregorianDateUtils";

export default class PersianDateUtils {
  static isValidYear(year: number): boolean {
    return (
      year >= PersianCalendarConstants.MIN_YEAR &&
      year <= PersianCalendarConstants.MAX_YEAR
    );
  }

  static isValidMonth(month: number): boolean {
    return month >= 1 && month <= 12;
  }

  /**
   * Determines whether the given Persian date is valid.
   *
   * The function checks if the year is within the valid range (1-9999), the
   * month is within the valid range (1-12), and the day is within the valid
   * range for the given month and year.
   */
  static isValidDate(date: Date): boolean {
    if (isNaN(date.getTime())) {
      return false;
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (
      !PersianDateUtils.isValidYear(year) ||
      !PersianDateUtils.isValidMonth(month)
    ) {
      return false;
    }

    const maxDaysInMonth = PersianCalendarConstants.MONTHS_DAYS[month - 1];

    if (month === 12 && GregorianDateUtils.isLeapYear(year)) {
      return day >= 1 && day <= 30; //? Esfand has 30 days in leap years
    }

    return day >= 1 && day <= maxDaysInMonth;
  }
}
