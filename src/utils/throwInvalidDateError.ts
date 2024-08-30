import InvalidDateSeverity from "../types/InvalidDateSeverity";

export default function throwInvalidDateError(): never {
  throw new Error("Invalid Date");
}
