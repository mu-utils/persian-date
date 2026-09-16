import persianToGregorian from "../utils/gregorian/persianToGregorian";

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

  it("should convert historical dates across century boundaries and leap cycles", () => {
    expect(persianToGregorian(1400, 1, 1)).toEqual([2021, 3, 21]);
    expect(persianToGregorian(1279, 1, 1)).toEqual([1900, 3, 21]);
    expect(persianToGregorian(1300, 1, 1)).toEqual([1921, 3, 21]);
    expect(persianToGregorian(1404, 1, 1)).toEqual([2025, 3, 21]);
  });
});
