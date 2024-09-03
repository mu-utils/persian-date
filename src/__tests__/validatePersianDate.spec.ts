import validatePersianDate from "../utils/validatePersianDate";
import dateValidationResult from "../constants/dateValidationResult";
import { isLeapYear } from "../utils/leapYear";

describe("validatePersianDate", () => {
  it("should return false for invalid date", () => {
    expect(validatePersianDate(2023, 2, 21)).toBe(false);
  });

  it("should return false for non leap year", () => {
    expect(validatePersianDate(1402, 12, 31)).toBe(false);
  });

  it("should return true for leap year", () => {
    expect(validatePersianDate(1403, 12, 1)).toBe(true);
  });

  it("should return false for non-leap year", () => {
    expect(validatePersianDate(1398, 12, 30)).toBe(false);
  });
});
