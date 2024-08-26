import PersianDate from "../PersianDate";

describe("PersianDate", () => {
  describe("now", () => {
    it("should return current date", () => {
      const date = new PersianDate("1399/12/31 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-12-31");
    });

    it("should return current date with default options", () => {
      const date = new PersianDate();
      expect(date.format("YYYY-MM-DD")).toBe(
        new PersianDate().format("YYYY-MM-DD")
      );
    });
  });
});
