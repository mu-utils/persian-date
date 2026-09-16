import gregorianToPersian from "../utils/gregorian/gregorianToPersian";
import persianToGregorian from "../utils/gregorian/persianToGregorian";

describe("gregorianToPersian", () => {
  it("should convert gregorian date to persian date", () => {
    expect(gregorianToPersian(2024, 9, 2)).toEqual([1403, 6, 12]);
    expect(gregorianToPersian(2023, 9, 3)).toEqual([1402, 6, 12]);
    expect(gregorianToPersian(2021, 3, 21)).toEqual([1400, 1, 1]);
  });

  it("should throw error with negative year", () => {
    expect(() => gregorianToPersian(-2024, 9, 2)).toThrow("Invalid Date");
  });

  it("should correctly convert dates in January and February (gm <= 2)", () => {
    expect(gregorianToPersian(2024, 1, 1)).toEqual([1402, 10, 11]);
    expect(gregorianToPersian(2024, 2, 15)).toEqual([1402, 11, 26]);
  });

  it("should handle leap and century years correctly", () => {
    // 2000 is a 400-year leap year
    expect(gregorianToPersian(2000, 3, 20)).toEqual([1379, 1, 1]);
    // 1900 is not a leap year (divisible by 100 but not 400)
    expect(gregorianToPersian(1900, 3, 21)).toEqual([1279, 1, 1]);
  });

  it("should handle dates near Persian year end (Esfand)", () => {
    expect(gregorianToPersian(2025, 3, 20)).toEqual([1403, 12, 30]); // 1403 is leap (30 Esfand)
    expect(gregorianToPersian(2024, 3, 19)).toEqual([1402, 12, 29]); // 1402 is non-leap (29 Esfand)
  });

  it("should handle years <= 1600 correctly", () => {
    const pDate = gregorianToPersian(1500, 3, 20);
    expect(pDate[0]).toBeLessThan(979);
    expect(pDate).toBeDefined();
    // Round trip verification for years > 1600
    const testCases: [number, number, number][] = [
      [1989, 7, 15],
      [2000, 1, 1],
      [2020, 2, 29],
      [2024, 9, 2],
      [2026, 3, 21],
    ];
    for (const [gy, gm, gd] of testCases) {
      const [jy, jm, jd] = gregorianToPersian(gy, gm, gd);
      expect(persianToGregorian(jy, jm, jd)).toEqual([gy, gm, gd]);
    }
  });
});
