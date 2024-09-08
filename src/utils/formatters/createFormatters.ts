import FormatOptions from "../../types/FormatOptions";
import Formatters from "../../types/Formatters";

function createFormatters(options: FormatOptions): Formatters {
  const formatterFactory = createFormatter(options);

  return [
    formatterFactory({
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    formatterFactory({ weekday: "long" }),
    formatterFactory({ weekday: "short" }),
    formatterFactory({ month: "long" }),
    formatterFactory({ month: "short" }),
  ];
}

const createFormatter = (originalOptions: FormatOptions) => {
  const locale = originalOptions.calendar === "persian" ? "fa-IR" : "en-GB";

  return (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...originalOptions, ...options });
};

export default createFormatters;
