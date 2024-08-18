import { PersianDate } from "..";
import GregorianCalendarConstants from "../GreogorianCalendarConstants";
import PersianCalendarConstants from "../PersianCalendarConstants";

export default class PersianDateUtils {
  static isValidPersianYear(year: number): boolean {
    return (
      year >= PersianCalendarConstants.MIN_YEAR &&
      year <= PersianCalendarConstants.MAX_YEAR
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

    const maxDaysInMonth = PersianCalendarConstants.MONTHS_DAYS[month - 1];

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

  /**
   * Calculates the number of days in the given Persian year.
   */
  private static getEpochBase(year: number): number {
    return (
      year -
      (year >= 0
        ? PersianCalendarConstants.BASE_YEAR
        : PersianCalendarConstants.BASE_YEAR - 1)
    );
  }

  private static getEpochYear(epochBase: number) {
    return (
      PersianCalendarConstants.BASE_YEAR +
      (epochBase % PersianCalendarConstants.YEAR_CYCLE)
    );
  }

  static toGregorian(data: Date) {
    const year = data.getFullYear();
    const month = data.getMonth();
    const day = data.getDate();
    const epochBase = PersianDateUtils.getEpochBase(year);
    const epochYear = PersianDateUtils.getEpochYear(epochBase);
    const passedDaysInMonth =
      PersianCalendarConstants.PASSED_DAYS_IN_MONTHS[month - 1];

    const totalGregorianDays =
      day +
      passedDaysInMonth +
      Math.floor((epochYear * 682 - 110) / 2816) +
      (epochYear - 1) * 365 +
      Math.floor(epochBase / PersianCalendarConstants.YEAR_CYCLE) *
        PersianCalendarConstants.TOTAL_DAYS_IN_2820_YEARS +
      (PersianCalendarConstants.EPOCH - 1);

    const wjd = totalGregorianDays - 1;
    const depoch = wjd - GregorianCalendarConstants.EPOCH;
    const quadricent = Math.floor(depoch / 146097);
    const dqc = depoch % 146097;
    const cent = Math.floor(dqc / 36524);
    const dcent = dqc % 36524;
    const quad = Math.floor(dcent / 1461);
    const dquad = dcent % 1461;
    const yindex = Math.floor(dquad / 365);

    console.log(totalGregorianDays, "totalGregorianDays");
  }

  private static getPassedDaysInMonths() {
    let sum = 0;

    return PersianCalendarConstants.MONTHS_DAYS.map((day) => {
      const passedDays = sum;
      sum += day;
      return passedDays;
    });
  }
}
