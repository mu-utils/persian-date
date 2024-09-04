import FormatOptions from "../types/FormatOptions";
import Formatters from "../types/Formatters";

function createFormatter(options: FormatOptions): Formatters {
  const locale = options.calendar === "persian" ? "fa-IR" : "en-US";

  return [
    new Intl.DateTimeFormat(locale, { weekday: "long", ...options }),
    new Intl.DateTimeFormat(locale, { weekday: "short", ...options }),
    new Intl.DateTimeFormat(locale, { month: "long", ...options }),
    new Intl.DateTimeFormat(locale, { month: "short", ...options }),
  ];
}

export default createFormatter;
