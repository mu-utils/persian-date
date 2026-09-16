type DateSegment =
  | "MM"
  | "YYYY"
  | "DD"
  | "dddd"
  | "MMM"
  | "MMMM"
  | "YY"
  | "D"
  | "ddd"
  | "Do"
  | "M"
  | "SSS"
  | "jYYYY"
  | "jYY"
  | "jMMMM"
  | "jMMM"
  | "jMM"
  | "jM"
  | "jDD"
  | "jD";

type TimeSegment = "HH" | "H" | "mm" | "m" | "ss" | "s" | "a" | "A" | "h";

type DateTimeSegment = DateSegment | TimeSegment;

export default DateTimeSegment;
