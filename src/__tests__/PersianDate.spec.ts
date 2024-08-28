import PersianDate from "../PersianDate";

describe("PersianDate", () => {
  describe("constructor", () => {
    it("should throw error if date is invalid", () => {
      expect(() => new PersianDate("2003", { ignoreCalendar: false })).toThrow(
        "Invalid Date"
      );
    });
  });

  describe("format", () => {
    it("should throw Invalid Date error", () => {
      expect(() => new PersianDate("1399/12/31 23:59:59.999")).toThrow(
        "Invalid Date"
      );
    });
  });

  describe("normalizeDate", () => {
    it("should normalize date", () => {
      const date = new PersianDate("2021/1/2 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });
  });
});
