import Formatters from "../types/Formatters";
import Options from "../types/Options";
import extractFormatOptions from "./options/createFormatOptions";

function createFormatter(options: Options): Formatters {
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
