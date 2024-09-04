import FormatOptions from "../types/FormatOptions";

/**
 *  Converts a Gregorian date to Persian date. It returns converted date in
 *  milliseconds. It uses the current time as a base.
 *
 * @param value - Gregorian date in milliseconds.
 * @returns Persian date in milliseconds.
 */
export const toPersianTime = (
  value: number | Date,
  { timeZone }: FormatOptions
): number => {
  const localeTime = new Date(value).toLocaleString("fa-IR-u-nu-latn", {
    timeZone,
  });
  return new Date(localeTime).getTime();
};
