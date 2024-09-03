import Calendar from "../types/Calendar";
import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";
import gregorianFormatter from "./createGregorianFormatter";
import createPersianFormatter from "./createPersianFormatter";
import extractFormatOptions from "./extractFormatOptions";

export default function createFormatter(
  options: RequiredPersianDateOptions
): Intl.DateTimeFormat {
  const formatOptions = extractFormatOptions(options);

  if (options.calendar === "persian") {
    return createPersianFormatter(formatOptions);
  }

  return gregorianFormatter(formatOptions);
}
