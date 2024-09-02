import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";

/**
 * this is a default options for PersianDate in the future some other configs will be add to this
 */
const DEFAULT_OPTIONS: RequiredPersianDateOptions = {
  ignoreCalendar: true,
  timeZone: "Asia/Tehran",
  invalidDateSeverity: "default",
  calender: "persian",
};

export default DEFAULT_OPTIONS;
