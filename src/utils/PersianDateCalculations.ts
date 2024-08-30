import DateValidationResult from "../constants/DateValidationResult";
import PersianCalendarConstants from "../constants/persianCalendar";
import { isLeapYear } from "./leapYear";

export default class PersianDateUtils {
  private static isValidYear(year: number): boolean {
    return (
      year >= PersianCalendarConstants.MIN_YEAR &&
      year <= PersianCalendarConstants.MAX_YEAR
    );
  }

  private static isValidMonth(month: number): boolean {
    return month >= 1 && month <= 12;
  }

  private static isValidDay(day: number, year: number, month: number): boolean {
    const maxDaysInMonth = PersianCalendarConstants.MONTHS_DAYS[month - 1];

    if (month === 12 && isLeapYear(year)) {
      return day >= 1 && day <= 30; //? Esfand has 30 days in leap years
    }

    return day >= 1 && day <= maxDaysInMonth;
  }

  /**
   * Determines whether the given Persian date is valid.
   *
   * The function checks if the year is within the valid range (1-9999), the
   * month is within the valid range (1-12), and the day is within the valid
   * range for the given month and year.
   */
  static validateDate(date: Date): DateValidationResult {
    if (isNaN(date.getTime())) {
      return DateValidationResult.DATE_IS_INVALID;
    }

    const year = date.getFullYear();

    if (!this.isValidYear(year)) {
      return DateValidationResult.PERSIAN_DATE_IS_INVALID;
    }

    const month = date.getMonth() + 1;

    if (!PersianDateUtils.isValidMonth(month)) {
      return DateValidationResult.DATE_IS_INVALID;
    }

    // whenever the date is persian the day should be valid otherwise it will be invalid
    if (!this.isValidDay(date.getDate(), year, month)) {
      return DateValidationResult.DATE_IS_INVALID;
    }

    return DateValidationResult.DATE_IS_VALID;
  }
}
