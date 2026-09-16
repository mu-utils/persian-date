import normalizeArguments from "./normalizeArguments";
import DateValue from "../../types/DateValue";

/**
 * Gets timestamp from a DateValue.
 *
 * @param value DateValue
 * @returns timestamp in milliseconds
 */
export default function getTime(value: DateValue): number {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "string") {
    return normalizeArguments([value])[0];
  }

  return value;
}

