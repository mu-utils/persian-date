import DateFormatTemplate from "../../types/DateFormatTemplate";
import Formatters from "../../types/Formatters";
import toPersianDigits from "../persian/toPersianDigits";
import createFormatReplacements from "./createFormatReplacements";

const REGEX_FORMAT =
  /\[([^\]]+)\]|jYYYY|jYY|jMMMM|jMMM|jMM|jM|jDD|jD|YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|Do|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g;

export interface FormatOptionsConfig {
  digits?: "en" | "fa";
}

/**
 * Formats a date. It takes a date timestamp and a template and returns a formatted date.
 *
 * @param time - The date timestamp to format.
 * @param template - The template to use.
 * @param formatters - The formatters to use.
 * @param options - Optional formatting configuration (e.g. { digits: "fa" }).
 * @returns The formatted date.
 */
export default function formatTime(
  time: number,
  template: DateFormatTemplate,
  formatters: Formatters,
  options?: FormatOptionsConfig
) {
  if (isNaN(time)) return "Invalid Date";
  const replacements = createFormatReplacements(time, formatters);

  const formatted = `${template}`.replace(REGEX_FORMAT, (match, escaped) => {
    if (escaped) return escaped;
    return (replacements as Record<string, string>)[match];
  });

  if (options?.digits === "fa") {
    return toPersianDigits(formatted);
  }

  return formatted;
}
