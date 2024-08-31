import toGregorian from "../utils/toGregorian";

describe("toGregorianDate", () => {
  it("toGregorian", () => {
    const a = toGregorian(1402, 12, 1);
    expect(a).toBe(1);
  });

  // it("should convert Persian date to Gregorian date correctly", () => {
  //   const result = GregorianDateUtils.toGregorianDate(
  //     new PersianDate("1399-12-6")
  //   );

  //   expect(result).toEqual(""); // August 6, 2023
  // });
  // it("should convert Persian date to Gregorian date correctly", () => {
  //   const result = toGregorianDate(1402, 5, 15);
  //   expect(result).toEqual(new Date(2023, 7, 6)); // August 6, 2023
  // });

  // it("should handle leap years correctly", () => {
  //   const result = toGregorianDate(1399, 12, 30);
  //   expect(result).toEqual(new Date(2021, 2, 20)); // March 20, 2021
  // });

  // it("should handle first day of Persian year", () => {
  //   const result = toGregorianDate(1400, 1, 1);
  //   expect(result).toEqual(new Date(2021, 2, 21)); // March 21, 2021
  // });

  // it("should handle last day of Persian year", () => {
  //   const result = toGregorianDate(1401, 12, 29);
  //   expect(result).toEqual(new Date(2023, 2, 20)); // March 20, 2023
  // });

  // it("should handle edge case of very early Persian date", () => {
  //   const result = toGregorianDate(1, 1, 1);
  //   expect(result).toEqual(new Date(622, 2, 22)); // March 22, 622
  // });

  // it("should handle edge case of far future Persian date", () => {
  //   const result = toGregorianDate(2000, 1, 1);
  //   expect(result).toEqual(new Date(2621, 2, 21)); // March 21, 2621
  // });
});
