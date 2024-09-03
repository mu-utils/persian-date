import RequiredPersianDateOptions from "../types/RequiredPersianDateOptions";

export default function extractFormatOptions(
  options: RequiredPersianDateOptions
): Intl.DateTimeFormatOptions {
  const { timeZone, calendar } = options;

  return { timeZone, calendar, numberingSystem: "latin" };
}
