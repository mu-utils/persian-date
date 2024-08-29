// Date segments for formatting
type DateSegment =
  | "MM"    // Month (01-12)
  | "YYYY"  // 4-digit year
  | "DD"    // Day of month (01-31)
  | "dddd"  // Day of week (Monday, Tuesday, etc.)
  | "MMM"   // Short month name (Jan, Feb, etc.)
  | "MMMM"  // Full month name (January, February, etc.)
  | "YY"    // 2-digit year
  | "D"     // Day of month (1-31, no leading zero)
  | "ddd"   // Short day of week (Mon, Tue, etc.)
  | "Do"    // Day of month with ordinal (1st, 2nd, 3rd, etc.)
  | "M"     // Month (1-12, no leading zero)
  | "YYYY"; // 4-digit year (same as above, included for completeness)
type TimeSegment = "HH" | "mm" | "ss" | "h" | "a";

type DateTimeSegment = DateSegment | TimeSegment;

export default DateTimeSegment;
