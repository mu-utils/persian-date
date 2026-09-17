import {
  DEFAULT_INVALID_DATE_SEVERITY,
  DEFAULT_CALENDAR,
} from "../../constants/defaultOptions";
import Options from "../../types/Options";
import PersianDateOptions from "../../types/PersianDateOptions";

const normalizeCalendar = (cal?: string) => {
  if (cal === "jalali" || cal === "shamsi") return "persian";
  if (cal === "gregorian") return "gregorian";
  return DEFAULT_CALENDAR;
};

const createOptions = ({
  calendar,
  ignoreCalendar,
  invalidDateSeverity,
}: PersianDateOptions | undefined = {}): Options => ({
  ignoreCalendar: ignoreCalendar ?? true,
  calendar: normalizeCalendar(calendar),
  invalidDateSeverity: invalidDateSeverity ?? DEFAULT_INVALID_DATE_SEVERITY,
});

export default createOptions;

