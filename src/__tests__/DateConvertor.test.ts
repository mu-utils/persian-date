import DateConvertor from "../DateConvertor/DateConvertor";

describe("DateConvertor", () => {
  describe("isLeapYear", () => {
    it("should return true for 1403", () => {
      expect(DateConvertor["isLeapYear"](1403)).toBe(true);
    });

    it("should return true for 1407", () => {
      expect(DateConvertor["isLeapYear"](1407)).toBe(true);
    });

    it("should return false for 1401", () => {
      expect(DateConvertor["isLeapYear"](1401)).toBe(false);
    });
  });
});
