import PersianDate from "../PersianDate";
import PersianDateOptions from "../types/PersianDateOptions";

function persianDate(): void;
function persianDate(options: PersianDateOptions): PersianDate;
function persianDate(value: Date, options?: PersianDateOptions): PersianDate;
function persianDate(value: number, options?: PersianDateOptions): PersianDate;
function persianDate(value: string, options?: PersianDateOptions): PersianDate;
function persianDate(
  year: number,
  month: number,
  options?: PersianDateOptions
): PersianDate;
function persianDate(
  year: number,
  month: number,
  date: number,
  options?: PersianDateOptions
): PersianDate;
function persianDate(
  year: number,
  month: number,
  date: number,
  hours: number,
  options?: PersianDateOptions
): PersianDate;
function persianDate(
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number,
  options?: PersianDateOptions
): PersianDate;
function persianDate(...args: unknown[]): PersianDate {
  return new PersianDate(...(args as []));
}

export default persianDate;
