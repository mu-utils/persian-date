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

    it("should return false for 1200", () => {
      expect(PersianDateUtils["isValidPersianYear"](1180)).toBe(false);
    });

    it("should return false for 2005", () => {
      expect(PersianDateUtils["isValidPersianYear"](2005)).toBe(false);
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

  describe("getEpochBase", () => {
    it("should return 1527 for 2001", () => {
      expect(PersianDateUtils["getEpochBase"](2001)).toBe(1527);
    });
  });

  describe("getEpochYear", () => {
    it("should return 2489 for 2015", () => {
      expect(PersianDateUtils["getEpochYear"](2015)).toBe(2489);
    });
  });

  describe("getPassedDaysInMonths", () => {
    it("should return [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336]", () => {
      expect(PersianDateUtils["getPassedDaysInMonths"]()).toStrictEqual([
        0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336,
      ]);
    });
  });
});
