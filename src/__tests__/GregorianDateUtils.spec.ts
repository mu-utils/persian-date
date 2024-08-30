describe("GregorianDateUtils", () => {
  describe("isLeapYear", () => {
    it("should return true for 1403", () => {
      expect(GregorianDateUtils["isLeapYear"](1403)).toBe(true);
    });

    it("should return true for 1407", () => {
      expect(GregorianDateUtils["isLeapYear"](1407)).toBe(true);
    });

    it("should return false for 1401", () => {
      expect(GregorianDateUtils["isLeapYear"](1401)).toBe(false);
    });
  });

  describe("calculateEpochYear", () => {
    it("should return 2489 for 2015", () => {
      expect(GregorianDateUtils["calculateEpochYear"](2015)).toBe(2489);
    });
  });

  describe("getPassedDaysInMonths", () => {
    it("should return [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336]", () => {
      expect(GregorianDateUtils["getPassedDaysInMonths"]()).toStrictEqual([
        0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336,
      ]);
    });
  });
});
