import PersianDate from "../PersianDate";

describe("PersianDate", () => {
  describe("normalizeDate", () => {
    it("should throw Invalid Date 1399/12/31 23:59:59.999 in strict mode", () => {
      expect(
        () =>
          new PersianDate("1399/12/31 23:59:59.999", {
            invalidDateSeverity: "error",
          })
      ).toThrow("Invalid date");
    });

    it("should return 1399-10-13", () => {
      const date = new PersianDate("1399/10/13");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });

    it("should set date to NaN and don't throw error for invalid date", () => {
      const date = new PersianDate("1393/12/31", {
        invalidDateSeverity: "default",
      });
      expect(date.getDate()).toBe(NaN);
    });

    it("should support constructor with Date instance", () => {
      const jsDate = new Date(2024, 8, 3); // 2024-09-03 -> 1403-06-13
      const persianDate = new PersianDate(jsDate);
      expect(persianDate.getFullYear()).toBe(1403);
      expect(persianDate.getMonth()).toBe(6);
      expect(persianDate.getDate()).toBe(13);
    });

    it("should support constructor with numeric timestamp", () => {
      const timestamp = new Date(2024, 8, 3).getTime();
      const persianDate = new PersianDate(timestamp);
      expect(persianDate.getFullYear()).toBe(1403);
      expect(persianDate.getMonth()).toBe(6);
      expect(persianDate.getDate()).toBe(13);
    });
  });

  describe("format", () => {
    it("should format date 2021/1/2 23:59:59.999", () => {
      const date = new PersianDate("2021/01/02 23:59:59.999");
      expect(date.format("YYYY-MM-DD")).toBe("1399-10-13");
    });

    it("should support escaped text in format template", () => {
      const date = new PersianDate("1403/06/12");
      expect(date.format("[Date:] YYYY/MM/DD")).toBe("Date: 1403/06/12");
    });
  });

  describe("isLeapYear", () => {
    it("should return true for persian leap year", () => {
      const date = new PersianDate("1404/10/13");
      expect(date.isLeapYear()).toBe(true);
    });

    it("should return true for gregorian leap year", () => {
      const date = new PersianDate("2024/1/2 23:59:59.999", {
        calendar: "gregorian",
      });
      expect(date.isLeapYear()).toBe(true);
    });
  });

  describe("diff", () => {
    it("should return 0 for the same date", () => {
      const date1 = new PersianDate(1400, 1, 1);
      const date2 = new PersianDate(1400, 1, 1);
      expect(date1.diff(date2)).toBe(0);
    });

    it("should return the same result regardless of the order of dates", () => {
      const date1 = new PersianDate(1400, 1, 1);
      const date2 = new PersianDate(1400, 1, 5);
      expect(date1.diff(date2)).toBe(date2.diff(date1));
    });

    it("should return the correct difference in hours", () => {
      const date1 = new PersianDate(1400, 1, 5, 4);
      const date2 = new PersianDate(1400, 1, 5, 5);
      expect(date1.diff(date2, "hours")).toBe(1);
    });

    it("should return the correct difference in months", () => {
      const date1 = new PersianDate(1400, 1, 5);
      const date2 = new PersianDate(1400, 2, 5);
      expect(date1.diff(date2, "months")).toBe(1);
    });
  });

  describe("add", () => {
    it("should add days correctly", () => {
      const date = new PersianDate(1402, 1, 1);
      const result = date.add(5, "days");
      expect(result.getDate()).toBe(6);
    });

    it("should support unit-first argument order for add", () => {
      const date = new PersianDate(1402, 1, 1);
      const result = date.add("days", 5);
      expect(result.getDate()).toBe(6);
    });

    it("should add days correctly in gregorian calendar", () => {
      const date = new PersianDate("2023/1/1", {
        calendar: "gregorian",
      });
      const result = date.add(5, "days");
      expect(result.getDate()).toBe(6);
    });

    it("should add months correctly", () => {
      const date = new PersianDate(1402, 1, 1);
      const result = date.add(2, "months");
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(1);
    });

    it("should add months correctly in gregorian calendar", () => {
      const date = new PersianDate("2023/1/1", {
        calendar: "gregorian",
      });
      const result = date.add(2, "months");
      expect(result.getMonth()).toBe(3);
    });

    it("should add years correctly", () => {
      const date = new PersianDate(1402, 1, 1);
      const result = date.add(1, "years");
      expect(result.getFullYear()).toBe(1403);
    });

    it("should add years correctly in gregorian calendar", () => {
      const date = new PersianDate("2023/1/1", {
        calendar: "gregorian",
      });
      const result = date.add(1, "years");
      expect(result.getFullYear()).toBe(2024);
    });

    it("should add last days of the Tir month correctly", () => {
      const date = new PersianDate(1402, 4, 31);
      const result = date.add(1, "days");
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(1);
    });

    it("should handle adding across year boundary", () => {
      const date = new PersianDate(1402, 12, 29);
      const result = date.add(2, "days");
      expect(result.getFullYear()).toBe(1403);
      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(2);
    });
  });

  describe("subtract", () => {
    it("should subtract days correctly", () => {
      const date = new PersianDate(1402, 1, 10);
      const result = date.subtract(5, "days");
      expect(result.getDate()).toBe(5);
    });

    it("should support unit-first argument order for subtract", () => {
      const date = new PersianDate(1402, 1, 10);
      const result = date.subtract("days", 5);
      expect(result.getDate()).toBe(5);
    });

    it("should subtract months correctly", () => {
      const date = new PersianDate(1402, 3, 1);
      const result = date.subtract(2, "months");
      expect(result.getMonth()).toBe(1);
    });

    it("should subtract years correctly", () => {
      const date = new PersianDate(1402, 1, 1);
      const result = date.subtract(1, "years");
      expect(result.getFullYear()).toBe(1401);
    });

    it("should handle subtracting across year boundary", () => {
      const date = new PersianDate(1403, 1, 2);
      const result = date.subtract(2, "days");
      expect(result.getFullYear()).toBe(1402);
      expect(result.getMonth()).toBe(12);
      expect(result.getDate()).toBe(29);
    });
  });

  describe("mutations and state synchronization", () => {
    it("should update year when setFullYear is called", () => {
      const date = new PersianDate(1402, 1, 1);
      date.setFullYear(1405);
      expect(date.getFullYear()).toBe(1405);
      expect(date.getMonth()).toBe(1);
      expect(date.getDate()).toBe(1);
    });

    it("should update month when setMonth is called", () => {
      const date = new PersianDate(1402, 1, 1);
      date.setMonth(7);
      expect(date.getMonth()).toBe(7);
      expect(date.getFullYear()).toBe(1402);
    });

    it("should update date when setDate is called", () => {
      const date = new PersianDate(1402, 1, 1);
      date.setDate(15);
      expect(date.getDate()).toBe(15);
    });

    it("should clone properly", () => {
      const date = new PersianDate(1402, 5, 10);
      const cloned = date.clone();
      expect(cloned.getFullYear()).toBe(date.getFullYear());
      expect(cloned.getMonth()).toBe(date.getMonth());
      expect(cloned.getDate()).toBe(date.getDate());
      cloned.add(1, "days");
      expect(cloned.getDate()).toBe(11);
      expect(date.getDate()).toBe(10);
    });
  });
});

