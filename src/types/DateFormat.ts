type Segment = "MM" | "YYYY" | "DD";

type Separator = "-" | "/" | ".";

type DateFormat =
  | `${Segment}`
  | `${Segment}${Separator}${Segment}`
  | `${Segment}${Separator}${Segment}${Separator}${Segment}`;

export default DateFormat;
