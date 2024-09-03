const createGregorianFormatter = (
  options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat => new Intl.DateTimeFormat("en-US", options);

export default createGregorianFormatter;
