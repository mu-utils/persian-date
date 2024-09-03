import DateFormat from "./DateFormat";
import DateTimeSegment from "./DateTimeSegment";
import TimeFormat from "./TimeFormat";

type Separator = "-" | " ";

type DateFormatTemplate =
  | `${DateFormat}${Separator}${TimeFormat}`
  | DateTimeSegment
  | string;

export default DateFormatTemplate;
