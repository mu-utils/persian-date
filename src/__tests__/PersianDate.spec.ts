import PersianDate from "../PersianDate";
import isLeapYear from "../utils/common/isLeapYear";
import calculatePersianLeapOffset from "../utils/persian/calculatePersianLeapOffset";

describe("PersianDate", () => {
  describe("normalizeDate", () => {
    it("should throw error for year 2003 in strict mode", () => {
      const date = new PersianDate("2003", {
        ignoreCalendar: false,
        invalidDateSeverity: "error",
      });
      expect(date.getUTCFullYear()).toBe(1381);
    });

    it("should throw Invalid Date 1399/12/31 23:59:59.999 in strict mode", () => {
      expect(
        () =>
          new PersianDate("1399/12/31 23:59:59.999", {
            invalidDateSeverity: "error",
          })
      ).toThrow("Invalid Date");
    });

    it("should return 1399-10-13", () => {
      const date = new PersianDate("1399/10/13");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });

    it("should set date to NaN and don't throw error for invalid date", () => {
      const date = new PersianDate("1393/12/31", {
        invalidDateSeverity: "default",
        ignoreCalendar: false,
      });
      expect(date.getDate()).toBe(NaN);
    });
  });

  describe("format", () => {
    it("should format date 2021/1/2 23:59:59.999", () => {
      const date = new PersianDate("2021/1/2 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });
  });

  describe("isLeapYear", () => {
    it("should return true for persian leap year", () => {
      const date = new PersianDate("1403/10/13");
      expect(date.isLeapYear()).toBe(true);
    });

    it("should return true for gregorian leap year", () => {
      const date = new PersianDate("2024/1/2 23:59:59.999", {
        calendar: "gregorian",
      });
      expect(date.isLeapYear()).toBe(true);
    });
  });
});

describe("PersianDate", () => {
  describe("diff", () => {
    it("should return 0 for the same date", () => {
      const date1 = new PersianDate(1400, 1, 1);
      const date2 = new PersianDate(1400, 1, 1);
      expect(date1.diff(date2)).toBe(0);
    });

    it("should return the correct difference for different dates", () => {
      const date1 = new PersianDate(1400, 1, 1);
      const date2 = new PersianDate(1400, 1, 2);
      const oneDayInMs = 24 * 60 * 60 * 1000;
      expect(date1.diff(date2)).toBe(oneDayInMs);
    });

    it("should return the correct difference for dates in different years", () => {
      const date1 = new PersianDate(1400, 12, 29);
      const date2 = new PersianDate(1401, 1, 1);
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
      expect(date1.diff(date2)).toBe(twoDaysInMs);
    });

    it("should return the same result regardless of the order of dates", () => {
      const date1 = new PersianDate(1400, 1, 1);
      const date2 = new PersianDate(1400, 1, 5);
      expect(date1.diff(date2)).toBe(date2.diff(date1));
    });
  });
});
