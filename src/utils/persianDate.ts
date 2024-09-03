import PersianDate from "../PersianDate/PersianDate";
import PersianDateOptions from "../types/PersianDateOptions";

function persianDate(options?: PersianDateOptions): PersianDate;
function persianDate(value: number, options?: PersianDateOptions): PersianDate;
function persianDate(value: string, options?: PersianDateOptions): PersianDate;
function persianDate(value: Date, options?: PersianDateOptions): PersianDate;
function persianDate(
  year: number,
  month: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number,
  options?: PersianDateOptions
): PersianDate;
function persianDate(...args: Parameters<typeof Date>): PersianDate {
  return new PersianDate(...args);
}

export default persianDate;
