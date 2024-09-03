import DateSegment from "./DateSegment";

type Separator = "-" | "/" | ".";

type DateFormat =
  | `${DateSegment}`
  | `${DateSegment}${Separator}${DateSegment}`
  | `${DateSegment}${Separator}${DateSegment}${Separator}${DateSegment}`;

export default DateFormat;
