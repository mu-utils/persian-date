import Formatters from "../types/Formatters";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";
import extractFormatOptions from "./extractFormatOptions";

function createFormatter(options: RequiredPersianDateOptions): Formatters {
  const formatOptions = extractFormatOptions(options);
  const locale = formatOptions.calendar === "persian" ? "fa-IR" : "en-US";

  return [
    new Intl.DateTimeFormat(locale, { weekday: "long", ...formatOptions }),
    new Intl.DateTimeFormat(locale, { weekday: "short", ...formatOptions }),
    new Intl.DateTimeFormat(locale, { month: "long", ...formatOptions }),
    new Intl.DateTimeFormat(locale, { month: "short", ...formatOptions }),
  ];
}

export default createFormatter;
