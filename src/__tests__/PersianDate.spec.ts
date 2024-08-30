import PersianDate from "../PersianDate";

describe("PersianDate", () => {
  describe("constructor", () => {
    it("should throw error if date is invalid", () => {
      expect(() => new PersianDate("2003", { ignoreCalendar: false })).toThrow(
        "Invalid date"
      );
    });
  });

  describe("format", () => {
    it("should return formatted date", () => {
      const date = new PersianDate("1399/12/31 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-12-31");
    });
  });
});
