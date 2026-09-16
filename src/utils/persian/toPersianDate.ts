import DateType from "../../types/DateType";
import FormatOptions from "../../types/FormatOptions";

/**
 * Converts a Gregorian date to Persian date (year, month, day).
 *
 * @param value - Gregorian date as timestamp or Date object.
 * @param options - Formatting options including timeZone.
 * @returns An object containing Persian year, month, and day.
 */
export const toPersianDate = (
  value: number | Date,
  { timeZone }: FormatOptions
): DateType => {
  const date = typeof value === "number" ? new Date(value) : value;
  if (isNaN(date.getTime())) {
    return { year: NaN, month: NaN, day: NaN };
  }

  try {
    const formatter = new Intl.DateTimeFormat("en-u-ca-persian", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const parts = formatter.formatToParts(date);
    let year = NaN;
    let month = NaN;
    let day = NaN;

    for (const part of parts) {
      if (part.type === "year") year = parseInt(part.value, 10);
      else if (part.type === "month") month = parseInt(part.value, 10);
      else if (part.type === "day") day = parseInt(part.value, 10);
    }

    return { year, month, day };
  } catch {
    return { year: NaN, month: NaN, day: NaN };
  }
};

