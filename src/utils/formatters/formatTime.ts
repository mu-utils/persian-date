import DateFormatTemplate from "../../types/DateFormatTemplate";
import Formatters from "../../types/Formatters";
import createFormatReplacements from "./createFormatReplacements";

const REGEX_FORMAT =
  /\[([^\]]+)\]|YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|Do|D|HH|mm|ss|SSS|a|h/g;

/**
 * Formats a date. It takes a date timestamp and a template and returns a formatted date.
 *
 * @param time - The date timestamp to format.
 * @param template - The template to use.
 * @param formatters - The formatters to use.
 * @returns The formatted date.
 */
export default function formatTime(
  time: number,
  template: DateFormatTemplate,
  formatters: Formatters
) {
  if (isNaN(time)) return "Invalid Date";
  const replacements = createFormatReplacements(time, formatters);

  return `${template}`.replace(REGEX_FORMAT, (match, escaped) => {
    if (escaped) return escaped;
    return (replacements as Record<string, string>)[match];
  });
}

