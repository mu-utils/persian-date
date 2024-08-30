export const toPersianLocaleString = (date: Date): string =>
  date.toLocaleString("fa-IR-u-nu-latn");

export const toPersianTime = (value: Date | string | number): number =>
  new Date(toPersianLocaleString(new Date(value))).getTime();
