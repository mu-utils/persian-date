/**
 * Replaces Persian digits in the input string with their corresponding Latin digits.
 *
 * @param input - The input string containing Persian digits.
 * @returns The input string with Persian digits replaced by Latin digits.
 */
const replacePersianNumbers = (input: string) =>
  input.replace(/[۰-۹]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 1728)
  );

export default replacePersianNumbers;
