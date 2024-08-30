import GREGORIAN_EPOCH from "../constants/gregorianCalendar";
import {
  PERSIAN_BASE_YEAR,
  PERSIAN_YEAR_CYCLE,
  PERSIAN_LEAP_YEAR_MULTIPLIER,
  PERSIAN_LEAP_YEAR_ADJUSTMENT,
  PERSIAN_LEAP_YEAR_DIVISOR,
  PERSIAN_TOTAL_DAYS_IN_2820_YEARS,
  PERSIAN_EPOCH,
  PERSIAN_PASSED_DAYS_IN_MONTHS,
  PERSIAN_DAYS_IN_400_YEARS,
  PERSIAN_DAYS_IN_100_YEARS,
  PERSIAN_DAYS_IN_4_YEARS,
  PERSIAN_DAYS_IN_YEAR,
  PERSIAN_MONTHS_DAYS,
} from "../constants/persianCalendar";

export default class GregorianDateUtils {
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
  private static calculateEpochBase(year: number): number {
    return year - (year >= 0 ? PERSIAN_BASE_YEAR : PERSIAN_BASE_YEAR - 1);
  }

  /**
   * Calculates the number of days from the epoch to the given year.
   * @param epochBase - The number of years since the epoch.
   */
  private static calculateEpochYear(epochBase: number) {
    return PERSIAN_BASE_YEAR + (epochBase % PERSIAN_YEAR_CYCLE);
  }

  static getLeapYearFactor(epochYear: number): number {
    return Math.floor(
      (epochYear * PERSIAN_LEAP_YEAR_MULTIPLIER -
        PERSIAN_LEAP_YEAR_ADJUSTMENT) /
        PERSIAN_LEAP_YEAR_DIVISOR
    );
  }

  /**
   * Calculates the number of days from the epoch to the given epoch base.
   * @param epochBase - The number of years since the epoch.
   * @returns The number of days from the epoch to the given epoch base.
   */
  static getDaysFromCycleAndEpoch(epochBase: number): number {
    return (
      Math.floor(epochBase / PERSIAN_YEAR_CYCLE) *
        PERSIAN_TOTAL_DAYS_IN_2820_YEARS +
      (PERSIAN_EPOCH - 1)
    );
  }

  /**
   * Calculates the total number of Gregorian days for the given date.
   *
   * @param date - The date to calculate the total Gregorian days for.
   * @returns The total number of Gregorian days for the given date.
   */
  static getTotalGregorianDays(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const epochBase = GregorianDateUtils.calculateEpochBase(year);
    const epochYear = GregorianDateUtils.calculateEpochYear(epochBase);
    const passedDaysInMonth = PERSIAN_PASSED_DAYS_IN_MONTHS[month - 1];
    const leapYearFactor = GregorianDateUtils.getLeapYearFactor(epochYear);
    const totalDaysInYears = (epochYear - 1) * 365;
    const daysFromCycleAndEpoch = this.getDaysFromCycleAndEpoch(epochBase);

    return (
      day +
      passedDaysInMonth +
      leapYearFactor +
      totalDaysInYears +
      daysFromCycleAndEpoch
    );
  }

  static toGregorianDate(date: Date) {
    const totalGregorianDays = GregorianDateUtils.getTotalGregorianDays(date);
    const wjd = totalGregorianDays - 1;
    const depoch = wjd - GREGORIAN_EPOCH;
    const year = GregorianDateUtils.calculateYear(depoch);
    const month = GregorianDateUtils.calculateMonth(wjd, year);
    const day = GregorianDateUtils.calculateDay(wjd, year, month);

    return new Date(year, month - 1, day);
  }

  private static calculateDay(wjd: number, year: number, month: number) {
    return (
      wjd -
      GregorianDateUtils.dayFromYear(year) -
      GregorianDateUtils.dayInYear(year, month) +
      1
    );
  }

  private static calculateMonth(wjd: number, year: number) {
    const yearday = wjd - GregorianDateUtils.dayFromYear(year);
    const leapAdjustment =
      wjd < GregorianDateUtils.dayFromYear(year + 1) ? 0 : 1;

    return Math.floor(((yearday + leapAdjustment) * 12 + 373) / 367);
  }

  private static calculateYear(depoch: number) {
    const quadricentCycles = Math.floor(depoch / PERSIAN_DAYS_IN_400_YEARS);
    const daysSinceQuadricent = depoch % PERSIAN_DAYS_IN_400_YEARS;

    // Calculate number of 100-year cycles
    const centCycles = Math.floor(
      daysSinceQuadricent / PERSIAN_DAYS_IN_100_YEARS
    );
    const daysSinceCent = daysSinceQuadricent % PERSIAN_DAYS_IN_100_YEARS;

    // Calculate number of 4-year cycles
    const quadCycles = Math.floor(daysSinceCent / PERSIAN_DAYS_IN_4_YEARS);
    const daysSinceQuad = daysSinceCent % PERSIAN_DAYS_IN_4_YEARS;

    // Calculate number of years
    const year =
      quadricentCycles * 400 +
      centCycles * 100 +
      quadCycles * 4 +
      Math.floor(daysSinceQuad / PERSIAN_DAYS_IN_YEAR);
    return year;
  }

  private static dayInYear(year: number, month: number): number {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month > 2 && GregorianDateUtils.isLeapYear(year)) {
      return days[month - 1] + 1;
    }
    return days[month - 1];
  }

  private static dayFromYear(year: number): number {
    return (
      (year - 1) * PERSIAN_DAYS_IN_YEAR +
      Math.floor((year - 1) / 4) -
      Math.floor((year - 1) / 100) +
      Math.floor((year - 1) / 400) +
      GREGORIAN_EPOCH
    );
  }

  private static getPassedDaysInMonths() {
    let sum = 0;

    return PERSIAN_MONTHS_DAYS.map((day) => {
      const passedDays = sum;
      sum += day;
      return passedDays;
    });
  }
}
