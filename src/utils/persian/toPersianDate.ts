import DateType from "../../types/DateType";
import FormatOptions from "../../types/FormatOptions";
import gregorianToPersian from "../gregorian/gregorianToPersian";

/**
 * Converts a Gregorian date to Persian date (year, month, day).
 *
 * @param value - Gregorian date as timestamp or Date object.
 * @param options - Formatting options including timeZone.
 * @returns An object containing Persian year, month, and day.
 */
const formatterCache = new Map<string, Intl.DateTimeFormat>();

export const toPersianDate = (
  value: number | Date,
  { timeZone }: FormatOptions = {}
): DateType => {

  const date = typeof value === "number" ? new Date(value) : value;
  if (isNaN(date.getTime())) {
    return { year: NaN, month: NaN, day: NaN };
  }

  // Fast-path: local time zone (pure integer arithmetic, 100x faster than Intl)
  if (!timeZone) {
    const [year, month, day] = gregorianToPersian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    return { year, month, day };
  }

  // Fast-path: UTC
  if (timeZone === "UTC") {
    const [year, month, day] = gregorianToPersian(
      date.getUTCFullYear(),
      date.getUTCMonth() + 1,
      date.getUTCDate()
    );
    return { year, month, day };
  }

  try {
    let formatter = formatterCache.get(timeZone);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat("en-u-ca-persian", {
        timeZone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      formatterCache.set(timeZone, formatter);
    }

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
