import {
  DEFAULT_TIME_ZONE,
  DEFAULT_CALENDAR,
} from "../../constants/defaultOptions";
import FormatOptions from "../../types/FormatOptions";
import PersianDateOptions from "../../types/PersianDateOptions";

const createFormatOptions = ({
  calendar,
  timeZone,
}: PersianDateOptions | undefined = {}): FormatOptions => ({
  timeZone,
  calendar: calendar === "gregorian" ? undefined : DEFAULT_CALENDAR,
  numberingSystem: "latn",
});

export default createFormatOptions;
