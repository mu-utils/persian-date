import isValidPersian from "../utils/persian/isValidPersian";

describe("validatePersianDate", () => {
  it("should return false for year outside Persian range", () => {
    expect(isValidPersian(2023, 2, 21)).toBe(false);
  });

  it("should return false for non-leap year with 31 days in Esfand", () => {
    expect(isValidPersian(1402, 12, 31)).toBe(false);
  });

  it("should return true for valid date", () => {
    expect(isValidPersian(1402, 12, 29)).toBe(true);
  });

  it("should return true for leap year 30th Esfand", () => {
    expect(isValidPersian(1399, 12, 30)).toBe(true);
  });

  it("should return false for non-leap year 30th Esfand", () => {
    expect(isValidPersian(1398, 12, 30)).toBe(false);
  });
});

