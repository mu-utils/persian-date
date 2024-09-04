import {
  DEFAULT_TIME_ZONE,
  DEFAULT_CALENDAR,
} from "../../constants/defaultOptions";
import PersianDateOptions from "../../types/PersianDateOptions";

const createFormatOptions = ({
  calendar,
  timeZone,
}: PersianDateOptions | undefined = {}): Intl.DateTimeFormatOptions => ({
  timeZone: timeZone ?? DEFAULT_TIME_ZONE,
  calendar: calendar === "gregorian" ? undefined : DEFAULT_CALENDAR,
});

export default createFormatOptions;
