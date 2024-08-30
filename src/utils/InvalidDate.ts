import InvalidDateSeverity from "../types/InvalidDateSeverity";

export default class InvalidDate {
  constructor(private severity: InvalidDateSeverity) {}

  exception(message: string) {
    if (this.severity === "error") {
      throw InvalidDate.createError(message);
    }
  }

  private static createError(message: string) {
    return new Error(message);
  }
}
