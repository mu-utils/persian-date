import InvalidDateSeverity from "./InvalidDateSeverity";
import TimeZone from "./TimeZone";

export default interface PersianDateOptions {
  /**
   * While parse and conversion is based on the Gregorian calendar, there isn't any error throwing.
   *
   * strict mode?
   */
  ignoreCalendar?: boolean;

  /**
   * The time zone to use.
   * @default "Asia/Tehran"
   */
  timeZone?: TimeZone;
  /**
   * calendar: "persian",
   * format: "YYYY/MM/DD",
   * locale: "fa-IR",
   * numberingSystem: "latn",
   * timeZone: "Asia/Tehran",
   */

  /**
   *
   */
  invalidDateSeverity?: InvalidDateSeverity;
}
