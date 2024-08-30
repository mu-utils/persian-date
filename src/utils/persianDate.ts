import PersianDate from "../PersianDate/PersianDate";

function persianDate(): PersianDate;
function persianDate(value: number): PersianDate;
function persianDate(value: string): PersianDate;
function persianDate(value: Date): PersianDate;
function persianDate(
  year: number,
  month: number,
  date?: number,
  hours?: number,
  minutes?: number,
  seconds?: number,
  ms?: number
): PersianDate;
function persianDate(...args: Parameters<typeof Date>): PersianDate {
  return new PersianDate(...args);
}

export default persianDate;
