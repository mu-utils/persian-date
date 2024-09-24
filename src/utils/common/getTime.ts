import PersianDate from "../../PersianDate";
import DateValue from "../../types/DateValue";

/**
 *
 * @param value
 * @returns
 */
export default function getTime(value: DateValue): number {
  if (value instanceof Date) {
    return value.getTime();
  }

  return new Date(value).getTime();
}
