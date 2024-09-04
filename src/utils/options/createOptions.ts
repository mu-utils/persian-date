import {
  DEFAULT_INVALID_DATE_SEVERITY,
  DEFAULT_CALENDAR,
} from "../../constants/defaultOptions";
import Options from "../../types/Options";
import PersianDateOptions from "../../types/PersianDateOptions";

const createOptions = ({
  calendar,
  ignoreCalendar,
  invalidDateSeverity,
}: PersianDateOptions | undefined = {}): Options => ({
  ignoreCalendar: ignoreCalendar ?? true,
  calendar: calendar ?? DEFAULT_CALENDAR,
  invalidDateSeverity: invalidDateSeverity ?? DEFAULT_INVALID_DATE_SEVERITY,
});

export default createOptions;
