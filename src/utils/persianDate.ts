const persianDateFormat = new Intl.DateTimeFormat("fa-IR-u-nu-latn");

/**
 * 
 * @param value number
 * @returns 
 */
export const toPersianTime = (value: number | Date): number =>
  new Date(persianDateFormat.format(value)).getTime();
