import createFormatters from "./createFormatters";
import formatTime from "./formatTime";

/**
 * Overrides the display date instance. It takes a time and returns a formatted
 * date. It uses the template to replace the date with the corresponding value.
 *
 * @param time - The time to format.
 * @returns {string} The formatted date.
 */
export default function overrideDisplayDateInstance(time: number): string {
  const purple = "\x1b[35m";
  const reset = "\x1b[0m";

  const date = new Date(time);
  // console.log(date.getTimezoneOffset(), 'date');

  // console.log(date, 'date');
  // console.log(date, 'fdare');

  console.log(date, 'date dfsdfjisdojf');
  

  const formatters = createFormatters({ timeZone: "UTC" });
  const formattedDate = formatTime(time, "YYYY-MM-DDTHH:mm:ss.SSSZ", formatters);

  return `${purple}${formattedDate}${reset}`;
}
