/**
 * @description Create a Persian formatter.
 * @param options - The options to use.
 * @returns The formatter.
 */
const createPersianFormatter = (
  options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat => new Intl.DateTimeFormat("fa-IR-u-nu-latn", options);

export default createPersianFormatter;
