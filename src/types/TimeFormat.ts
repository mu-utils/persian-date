import TimeSegment from "./TimeSegment";

type TimeFormat =
  | `${TimeSegment}`
  | `${TimeSegment}:${TimeSegment}`
  | `${TimeSegment}:${TimeSegment}:${TimeSegment}`;

export default TimeFormat;
