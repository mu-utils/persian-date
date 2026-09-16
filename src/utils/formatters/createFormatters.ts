import FormatOptions from "../../types/FormatOptions";
import Formatters from "../../types/Formatters";

const formattersCache = new Map<string, Formatters>();

function createFormatters(options: FormatOptions): Formatters {
  const key = `${options.calendar || "default"}_${options.timeZone || "default"}`;
  let formatters = formattersCache.get(key);
  if (!formatters) {
    const formatterFactory = createFormatter(options);
    formatters = [
      formatterFactory({
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }),
      formatterFactory({ weekday: "long" }),
      formatterFactory({ weekday: "short" }),
      formatterFactory({ month: "long" }),
      formatterFactory({ month: "short" }),
    ];
    formattersCache.set(key, formatters);
  }
  return formatters;
}

const createFormatter = (originalOptions: FormatOptions) => {
  const locale = originalOptions.calendar === "persian" ? "fa-IR" : "en-GB";

  return (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...originalOptions, ...options });
};

export default createFormatters;
