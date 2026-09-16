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
      const date1403 = new PersianDate("1403/10/13");
      expect(date1403.isLeapYear()).toBe(true);

      const date1404 = new PersianDate("1404/10/13");
      expect(date1404.isLeapYear()).toBe(false);
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

    it("should update time zone", () => {
      const date = new PersianDate("1402/01/01 12:00:00");
      date.setTimeZone("UTC");
      date.setTimeZone("Asia/Tehran");
      expect(date.format("YYYY/MM/DD")).toBe("1402/01/01");
    });

    it("should switch calendar between persian and gregorian", () => {
      const date = new PersianDate("1403/06/13");
      date.setCalendar("gregorian");
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(9);
      expect(date.getDate()).toBe(3);
      date.setCalendar("persian");
      expect(date.getFullYear()).toBe(1403);
    });

    it("should set full year with month and date in Gregorian and Persian", () => {
      const pDate = new PersianDate("1402/01/01");
      pDate.setFullYear(1403, 5, 10);
      expect(pDate.getFullYear()).toBe(1403);
      expect(pDate.getMonth()).toBe(5);
      expect(pDate.getDate()).toBe(10);

      const gDate = new PersianDate("2023-01-01", { calendar: "gregorian" });
      gDate.setFullYear(2025, 4, 15);
      expect(gDate.getFullYear()).toBe(2025);
      expect(gDate.getMonth()).toBe(4);
      expect(gDate.getDate()).toBe(15);
    });

    it("should set month with date in Gregorian and Persian", () => {
      const pDate = new PersianDate("1402/01/01");
      pDate.setMonth(6, 20);
      expect(pDate.getMonth()).toBe(6);
      expect(pDate.getDate()).toBe(20);

      const gDate = new PersianDate("2023-01-01", { calendar: "gregorian" });
      gDate.setMonth(8, 25);
      expect(gDate.getMonth()).toBe(8);
      expect(gDate.getDate()).toBe(25);
    });

    it("should set date in Gregorian", () => {
      const gDate = new PersianDate("2023-01-01", { calendar: "gregorian" });
      gDate.setDate(20);
      expect(gDate.getDate()).toBe(20);
    });

    it("should set hours, minutes, seconds, milliseconds with optional arguments", () => {
      const date = new PersianDate("1402/01/01");
      date.setHours(10, 20, 30, 400);
      expect(date.getHours()).toBe(10);
      expect(date.getMinutes()).toBe(20);
      expect(date.getSeconds()).toBe(30);
      expect(date.getMilliseconds()).toBe(400);

      date.setMinutes(45, 50, 600);
      expect(date.getMinutes()).toBe(45);
      expect(date.getSeconds()).toBe(50);
      expect(date.getMilliseconds()).toBe(600);

      date.setSeconds(15, 700);
      expect(date.getSeconds()).toBe(15);
      expect(date.getMilliseconds()).toBe(700);

      date.setMilliseconds(800);
      expect(date.getMilliseconds()).toBe(800);
    });

    it("should calculate diff in seconds, minutes, years, and throw on invalid unit", () => {
      const d1 = new PersianDate(1400, 1, 1, 0, 0, 0);
      const d2 = new PersianDate(1400, 1, 1, 0, 1, 30);
      expect(d2.diff(d1, "seconds")).toBe(90);
      expect(d2.diff(d1, "minutes")).toBe(1.5);

      const d3 = new PersianDate(1401, 1, 1);
      expect(d3.diff(d1, "years")).toBeCloseTo(1, 1);

      // diff with string date
      expect(d2.diff("1400/01/01 00:00:00", "seconds")).toBe(90);

      // diff with invalid unit
      expect(() => d2.diff(d1, "invalid" as any)).toThrow("Invalid unit");
    });

    it("should return false for gregorian non-leap years", () => {
      const d1 = new PersianDate("2023/01/01", { calendar: "gregorian" });
      expect(d1.isLeapYear()).toBe(false);
      const d2 = new PersianDate("1900/01/01", { calendar: "gregorian" });
      expect(d2.isLeapYear()).toBe(false);
    });

    it("should throw error if more than 8 arguments passed to constructor", () => {
      expect(() => new (PersianDate as any)(1, 2, 3, 4, 5, 6, 7, 8, 9)).toThrow(
        "Invalid number of arguments"
      );
    });

    it("should handle string with no digits or invalid format", () => {
      const d = new PersianDate("hello");
      expect(isNaN(d.getTime())).toBe(true);

      expect(
        () =>
          new PersianDate("2021/13/45", {
            invalidDateSeverity: "error",
            calendar: "persian",
          })
      ).toThrow("Invalid date");
    });

    it("should handle invalid dates in gregorian mode", () => {
      expect(
        () =>
          new PersianDate("1402/01/01", {
            calendar: "gregorian",
            invalidDateSeverity: "error",
          })
      ).toThrow("Invalid date");

      const d = new PersianDate("1402/01/01", {
        calendar: "gregorian",
        invalidDateSeverity: "default",
      });
      expect(isNaN(d.getTime())).toBe(true);
    });

    it("should handle invalid date tuples in strict and default modes", () => {
      expect(
        () =>
          new PersianDate(1402, 12, 35, { invalidDateSeverity: "error" })
      ).toThrow("Invalid date");

      const d = new PersianDate(1402, 12, 35, { invalidDateSeverity: "default" });
      expect(isNaN(d.getTime())).toBe(true);

      const gDate = new PersianDate(2024, 5, 10, { calendar: "gregorian" });
      expect(gDate.getFullYear()).toBe(2024);
    });

    it("should handle options with ignoreCalendar", () => {
      const d = new PersianDate({ ignoreCalendar: false });
      expect(d.getFullYear()).toBeDefined();
    });

    it("should support util.inspect custom formatting", () => {
      const util = require("util");
      const date = new PersianDate("1402/01/01 12:00:00");
      const inspected = util.inspect(date);
      expect(typeof inspected).toBe("string");
    });

    it("should support setters with single arguments in both Persian and Gregorian", () => {
      const pDate = new PersianDate("1402/01/01");
      pDate.setFullYear(1405);
      expect(pDate.getFullYear()).toBe(1405);
      pDate.setMonth(5);
      expect(pDate.getMonth()).toBe(5);
      pDate.setHours(8);
      expect(pDate.getHours()).toBe(8);
      pDate.setMinutes(25);
      expect(pDate.getMinutes()).toBe(25);
      pDate.setSeconds(40);
      expect(pDate.getSeconds()).toBe(40);

      const gDate = new PersianDate("2023-01-01", { calendar: "gregorian" });
      gDate.setFullYear(2026);
      expect(gDate.getFullYear()).toBe(2026);
      gDate.setMonth(7);
      expect(gDate.getMonth()).toBe(7);
    });

    it("should handle invalid Date instance, valid timestamp, and ISO string", () => {
      const invalidDate = new PersianDate(new Date(NaN));
      expect(isNaN(invalidDate.getTime())).toBe(true);

      const nanTimestamp = new PersianDate(NaN);
      expect(isNaN(nanTimestamp.getTime())).toBe(true);

      const validTimestamp = new PersianDate(1600000000000);
      expect(validTimestamp.getTime()).toBe(1600000000000);

      const notADate = new PersianDate("not a date");
      expect(isNaN(notADate.getTime())).toBe(true);

      const isoDate = new PersianDate("2024-03-20T10:00:00Z");
      expect(isoDate.getFullYear()).toBeDefined();

      const defaultDayDate = new PersianDate(1402, 5);
      expect(defaultDayDate.getDate()).toBe(1);

      const defaultDayString = new PersianDate("1402/05");
      expect(defaultDayString.getDate()).toBe(1);
    });

    it("should handle invalid timezone and Date instance in toPersianDate", () => {
      const { toPersianDate } = require("../utils/persian/toPersianDate");
      const res = toPersianDate(Date.now(), { timeZone: "Invalid/Zone" as any });
      expect(isNaN(res.year)).toBe(true);

      const resWithDate = toPersianDate(new Date(1600000000000), { timeZone: "UTC" });
      expect(resWithDate.year).toBeDefined();
    });

    it("should calculate daysInMonth correctly for both calendars", () => {
      const farvardin = new PersianDate("1402/01/15");
      expect(farvardin.daysInMonth()).toBe(31);

      const mehr = new PersianDate("1402/07/15");
      expect(mehr.daysInMonth()).toBe(30);

      const esfandNonLeap = new PersianDate("1402/12/15");
      expect(esfandNonLeap.daysInMonth()).toBe(29);

      const esfandLeap = new PersianDate("1403/12/15");
      expect(esfandLeap.daysInMonth()).toBe(30);

      const gregJan = new PersianDate("2024-01-10", { calendar: "gregorian" });
      expect(gregJan.daysInMonth()).toBe(31);

      const gregFebLeap = new PersianDate("2024-02-10", { calendar: "gregorian" });
      expect(gregFebLeap.daysInMonth()).toBe(29);
    });

    it("should return toArray representation", () => {
      const d = new PersianDate("1402/05/10 14:30:45");
      const arr = d.toArray();
      expect(arr[0]).toBe(1402);
      expect(arr[1]).toBe(5);
      expect(arr[2]).toBe(10);
      expect(arr[3]).toBe(14);
      expect(arr[4]).toBe(30);
      expect(arr[5]).toBe(45);
    });

    it("should support startOf and endOf across all units", () => {
      const d = new PersianDate("1403/05/15 14:30:45.500");

      d.startOf("year");
      expect(d.getMonth()).toBe(1);
      expect(d.getDate()).toBe(1);
      expect(d.getHours()).toBe(0);

      d.setMonth(5);
      d.setDate(15);
      d.startOf("months");
      expect(d.getDate()).toBe(1);

      d.setHours(14, 30, 45, 500);
      d.startOf("days");
      expect(d.getHours()).toBe(0);

      d.setHours(14, 30, 45, 500);
      d.startOf("hours");
      expect(d.getMinutes()).toBe(0);

      d.setMinutes(30, 45, 500);
      d.startOf("minutes");
      expect(d.getSeconds()).toBe(0);

      d.setSeconds(45, 500);
      d.startOf("seconds");
      expect(d.getMilliseconds()).toBe(0);

      // endOf
      d.endOf("year");
      expect(d.getMonth()).toBe(12);
      expect(d.getDate()).toBe(30); // 1403 is leap year
      expect(d.getHours()).toBe(23);
      expect(d.getMinutes()).toBe(59);

      const dNonLeap = new PersianDate("1402/05/15");
      dNonLeap.endOf("year");
      expect(dNonLeap.getDate()).toBe(29); // 1402 is non-leap

      d.setMonth(1);
      d.endOf("months");
      expect(d.getDate()).toBe(31);

      d.endOf("days");
      expect(d.getHours()).toBe(23);

      d.endOf("hours");
      expect(d.getMinutes()).toBe(59);

      d.endOf("minutes");
      expect(d.getSeconds()).toBe(59);

      d.endOf("seconds");
      expect(d.getMilliseconds()).toBe(999);

      const greg = new PersianDate("2023-05-15", { calendar: "gregorian" });
      greg.endOf("year");
      expect(greg.getMonth()).toBe(12);
      expect(greg.getDate()).toBe(31);
    });

    it("should compare dates with isBefore, isAfter, and isSame", () => {
      const d1 = new PersianDate("1403/06/12");
      const d2 = new PersianDate("1403/06/15");
      const d3 = new PersianDate("1403/07/01");

      expect(d1.isBefore(d2)).toBe(true);
      expect(d2.isBefore(d1)).toBe(false);

      expect(d2.isAfter(d1)).toBe(true);
      expect(d1.isAfter(d2)).toBe(false);

      expect(d1.isSame(new PersianDate("1403/06/12"))).toBe(true);
      expect(d1.isSame(d2)).toBe(false);

      // Same year
      expect(d1.isSame(d2, "year")).toBe(true);
      expect(d1.isSame(new PersianDate("1402/06/12"), "year")).toBe(false);

      // Same month
      expect(d1.isSame(d2, "month")).toBe(true);
      expect(d1.isSame(d3, "month")).toBe(false);

      // Same day
      const dSameDay = new PersianDate("1403/06/12 15:30:00");
      expect(d1.isSame(dSameDay, "day")).toBe(true);
      expect(d1.isSame(d2, "day")).toBe(false);
      expect(d1.isSame(d2, "days")).toBe(false);

      // Same hour
      const dSameHour = new PersianDate("1403/06/12 15:45:00");
      expect(dSameDay.isSame(dSameHour, "hour")).toBe(true);
    });

    it("should parse ISO 8601 strings with timezone offsets correctly", () => {
      const isoWithOffset = new PersianDate("2024-09-02T14:30:00+03:30");
      expect(isNaN(isoWithOffset.getTime())).toBe(false);
      expect(isoWithOffset.getFullYear()).toBe(1403);
    });
  });
});



