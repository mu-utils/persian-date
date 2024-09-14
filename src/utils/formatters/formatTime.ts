import DateFormatTemplate from "../../types/DateFormatTemplate";
import DateTimeSegment from "../../types/DateTimeSegment";
import Formatters from "../../types/Formatters";
import createFormatReplacements from "./createFormatReplacements";

/**
 * Formats a date. It takes a date and a template and returns a formatted date.
 * It uses the template to replace the date with the corresponding value.
 *
 * @example
 * ```
 * formatDate(122343942384, "YYYY-MM-DD"); // "2023-04-01"
 * ```
 *
 * @param time - The date to format.
 * @param options - The options to use.
 * @param template - The template to use.
 * @returns The formatted date.
 */
export default function formatDate(
  time: number,
  template: DateFormatTemplate,
  formatters: Formatters
) {
  let result = `${template}`;
  const replacements = createFormatReplacements(time, formatters);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
}
