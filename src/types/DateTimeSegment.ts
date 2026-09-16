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

type TimeSegment = "HH" | "H" | "hh" | "h" | "mm" | "m" | "ss" | "s" | "a" | "A";

type DateTimeSegment = DateSegment | TimeSegment;

export default DateTimeSegment;
