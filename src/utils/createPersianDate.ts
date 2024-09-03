import PersianDate from "../PersianDate";
import PersianDateOptions from "../types/PersianDateOptions";

function createPersianDate(): PersianDate;
function createPersianDate(options: PersianDateOptions): PersianDate;
function createPersianDate(
  value: Date,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  value: number,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  value: string,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  year: number,
  month: number,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  year: number,
  month: number,
  date: number,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  year: number,
  month: number,
  date: number,
  hours: number,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number,
  options?: PersianDateOptions
): PersianDate;
function createPersianDate(...args: unknown[]): PersianDate {
  return new PersianDate(...(args as []));
}

export default createPersianDate;
