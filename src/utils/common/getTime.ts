import PersianDate from "../../PersianDate";
import DateType from "../../types/DateType";

/**
 *  
 * @param value 
 * @returns 
 */
export default function getTime(value: DateType): number {
  if (value instanceof PersianDate || value instanceof Date) {
    return value.getTime();
  }

  return new Date(value).getTime();
}
