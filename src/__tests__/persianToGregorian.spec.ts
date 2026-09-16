import persianToGregorian from "../utils/gregorian/persianToGregorian";
import julianDayToGregorian from "../utils/gregorian/julianDayToGregorian";
import persianToJulianDay from "../utils/persian/persianToJulianDay";

describe("persianToGregorian", () => {
  it("should convert persian date to gregorian date", () => {
    expect(persianToGregorian(1403, 6, 12)).toEqual([2024, 9, 2]);
  });

  it("should throw error date with negative year", () => {
    expect(() => persianToGregorian(-1403, 6, 12)).toThrow("Invalid Date");
  });

  it("should convert date in leap year", () => {
    expect(persianToGregorian(1402, 6, 12)).toEqual([2023, 9, 3]);
  });

  it("should handle historical julian day below gregorian reform", () => {
    const result = julianDayToGregorian(2000000);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it("should calculate epoch base for negative Persian year", () => {
    const jd = persianToJulianDay(-10, 1, 1);
    expect(typeof jd).toBe("number");
  });
});

