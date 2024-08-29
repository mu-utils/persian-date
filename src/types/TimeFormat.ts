type Segment = "HH" | "mm" | "ss";

type TimeFormat =
  | `${Segment}`
  | `${Segment}:${Segment}`
  | `${Segment}:${Segment}:${Segment}`;

export default TimeFormat;
