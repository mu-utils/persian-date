import PersianDateOptions from "../types/PersianDateOptions";

/**
 * this is a default options for PersianDate in the future some other configs will be add to this
 */
const DEFAULT_OPTIONS: PersianDateOptions = {
  ignoreCalendar: true,
  timeZone: "Asia/Tehran",
  invalidDateSeverity: "default",
  calender: "persian",
};

export default DEFAULT_OPTIONS;
