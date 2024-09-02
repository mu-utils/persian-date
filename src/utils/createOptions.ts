import Calendar from "../types/Calendar";
import InvalidDateSeverity from "../types/InvalidDateSeverity";
import PersianDateOptions from "../types/PersianDateOptions";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";
import TimeZone from "../types/TimeZone";

const DEFAULT_TIME_ZONE: TimeZone = "Asia/Tehran";

const DEFAULT_CALENDAR: Calendar = "persian";

const DEFAULT_INVALID_DATE_SEVERITY: InvalidDateSeverity = "default";

const createOptions = (
  options?: PersianDateOptions
): RequiredPersianDateOptions => ({
  ignoreCalendar: options?.ignoreCalendar ?? true,
  timeZone: options?.timeZone || DEFAULT_TIME_ZONE,
  invalidDateSeverity:
    options?.invalidDateSeverity || DEFAULT_INVALID_DATE_SEVERITY,
  calendar: DEFAULT_CALENDAR,
});

export default createOptions;
