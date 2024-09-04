import Options from "../types/Options";
import gregorianFormatter from "./createGregorianFormatter";
import createPersianFormatter from "./createPersianFormatter";
import extractFormatOptions from "./options/createFormatOptions";

export default function createFormatter(options: Options): Intl.DateTimeFormat {
  const formatOptions = extractFormatOptions(options);

  if (options.calendar === "persian") {
    return createPersianFormatter(formatOptions);
  }

  return gregorianFormatter(formatOptions);
}
