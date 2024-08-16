import PersianDateUtils from "../PersianDateUtils";

describe("PersianDateUtils", () => {
  describe("isLeapYear", () => {
    it("should return true for 1403", () => {
      expect(PersianDateUtils["isLeapYear"](1403)).toBe(true);
    });

    it("should return true for 1407", () => {
      expect(PersianDateUtils["isLeapYear"](1407)).toBe(true);
    });

    it("should return false for 1401", () => {
      expect(PersianDateUtils["isLeapYear"](1401)).toBe(false);
    });
  });

  describe("isValidPersianYear", () => {
    it("should return true for 1320", () => {
      expect(PersianDateUtils["isValidPersianYear"](1320)).toBe(true);
    });
  });

  describe("isValidPersianMonth", () => {
    it("should return false for 13", () => {
      expect(PersianDateUtils["isValidPersianMonth"](13)).toBe(false);
    });
  });

  describe("isValidPersianDate", () => {
    it("should return true for 1400/01/01", () => {
      const date = new Date("1400/01/01");
      expect(PersianDateUtils.isValidPersianDate(date)).toBe(true);
    });

    it("should return false for 2001/01/01", () => {
      const date = new Date("2001/01/01");
      expect(PersianDateUtils.isValidPersianDate(date)).toBe(false);
    });
  });
});
