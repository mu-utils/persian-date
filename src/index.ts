import PersianDate from "./PersianDate";
import dayjsPlugin, { jalaliday } from "./plugins/dayjs";
import gregorianToPersian from "./utils/gregorian/gregorianToPersian";
import persianToGregorian from "./utils/gregorian/persianToGregorian";
import toGregorianDate from "./utils/gregorian/toGregorianDate";
import toPersianDigits from "./utils/persian/toPersianDigits";
import replacePersianNumbers from "./utils/persian/replacePersianNumbers";
import isPersianLeapYear from "./utils/persian/isPersianLeapYear";
import { toPersianDate } from "./utils/persian/toPersianDate";
import isLeapYear from "./utils/common/isLeapYear";
import relativeTime from "./utils/common/fromNow";
import formatTime from "./utils/formatters/formatTime";
import DateValue from "./types/DateValue";
import PersianDateOptions from "./types/PersianDateOptions";

/**
 * Convenience factory function to create a new PersianDate instance,
 * mirroring Dayjs/Moment syntax: `persianDate('1403/06/12')`.
 */
export function persianDate(options?: PersianDateOptions): PersianDate;
export function persianDate(value: DateValue, options?: PersianDateOptions): PersianDate;
export function persianDate(value: Date, options?: PersianDateOptions): PersianDate;
export function persianDate(value: number, options?: PersianDateOptions): PersianDate;
export function persianDate(value: string, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, date: number, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, date: number, hours: number, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, date: number, hours: number, minutes: number, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, options?: PersianDateOptions): PersianDate;
export function persianDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number, ms: number, options?: PersianDateOptions): PersianDate;
export function persianDate(...args: unknown[]): PersianDate {
  return new (PersianDate as any)(...args);
}

export {
  PersianDate,
  dayjsPlugin,
  jalaliday,
  gregorianToPersian,
  persianToGregorian,
  toGregorianDate,
  toPersianDate,
  toPersianDigits,
  replacePersianNumbers,
  isPersianLeapYear,
  isLeapYear,
  relativeTime,
  formatTime,
};

export default PersianDate;