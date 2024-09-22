import PersianDate from "../PersianDate";
import isPersianTime from "../utils/persian/isPersianLeapYear";

describe("validatePersianDate", () => {
  it("should return false for invalid date", () => {
    const time = new PersianDate("2023/12/31").getTime();
    expect(isPersianTime(time)).toBe(false);
  });

  it("should return false for non leap year", () => {
    const time = new Date(1402, 12 + 1, 31).getTime();
    expect(isPersianTime(time)).toBe(true);
  });

  it("should return true for leap year", () => {
    const time = new Date(1403, 12 + 1, 1).getTime();
    expect(isPersianTime(time)).toBe(true);
  });

  it("should return false for non-leap year", () => {
    const time = new Date(1398, 12 + 1, 30).getTime();
    expect(isPersianTime(time)).toBe(true);
  });
});
