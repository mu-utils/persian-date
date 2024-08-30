import InvalidDateSeverity from "../types/InvalidDateSeverity";

export default function throwInvalidDateError(
  invalidDateSeverity: InvalidDateSeverity | undefined
): never {
  throw new Error("Invalid Date");
}
