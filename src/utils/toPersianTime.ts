import persianDateFormatter from "./persianFormatter";

/**
 *  Converts a Gregorian date to Persian date. It returns converted date in
 *  milliseconds. It uses the current time as a base.
 *
 * @param value - Gregorian date in milliseconds.
 * @returns Persian date in milliseconds.
 */
export const toPersianTime = (value: number | Date): number =>
  new Date(persianDateFormatter.format(value)).getTime();
