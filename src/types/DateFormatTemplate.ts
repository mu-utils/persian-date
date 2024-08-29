import DateFormat from "./DateFormat";
import TimeFormat from "./TimeFormat";

type Separator = "-" | " ";

type Segment = DateFormat | TimeFormat;

type DateFormatTemplate = `${DateFormat}${Separator}${TimeFormat}` | Segment;

export default DateFormatTemplate;
