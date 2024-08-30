import PersianDateUtils from "../utils/PersianDateUtils";

describe("PersianDateUtils", () => {
  describe("isValidYear", () => {
    it("should return true for 1320", () => {
      expect(PersianDateUtils["isValidYear"](1320)).toBe(true);
    });

    it("should return false for 1200", () => {
      expect(PersianDateUtils["isValidYear"](1180)).toBe(false);
    });

    it("should return false for 2005", () => {
      expect(PersianDateUtils["isValidYear"](2005)).toBe(false);
    });
  });
});
