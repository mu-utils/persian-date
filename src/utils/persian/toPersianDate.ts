import DateType from "../../types/DateType";
import FormatOptions from "../../types/FormatOptions";

/**
 *  Converts a Gregorian date to Persian date. It returns converted date in
 *  milliseconds. It uses the current time as a base.
 *
 * @param value - Gregorian date in milliseconds.
 * @returns Persian date in milliseconds.
 */
export const toPersianDate = (
  value: number | Date,
  { timeZone }: FormatOptions
): DateType => {
  const localeTime = new Date(value).toLocaleString("fa-IR-u-nu-latn", {
    timeZone,
  });

  const [year, month, day] = localeTime.split("/").map(Number);
  return { year, month, day };
};
