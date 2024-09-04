import TimeZone from "./TimeZone";

type FormatOptions = Intl.DateTimeFormatOptions & {
  timeZone: TimeZone;
};

export default FormatOptions;
