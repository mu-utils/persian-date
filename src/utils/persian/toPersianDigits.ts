/**
 * Converts Latin (English) digits 0-9 in a string or number to Persian digits ۰-۹.
 *
 * @param {string | number} input - The string or number containing Latin digits.
 * @returns {string} The string with Latin digits converted to Persian digits.
 */
export default function toPersianDigits(input: string | number): string {
  if (input === null || input === undefined) return "";
  return String(input).replace(/[0-9]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) + 1728)
  );
}
