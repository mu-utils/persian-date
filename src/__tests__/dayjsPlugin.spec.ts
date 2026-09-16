import dayjs from "dayjs";
import dayjsPlugin, { jalaliday } from "../plugins/dayjs";

describe("dayjsPlugin", () => {
  beforeAll(() => {
    dayjs.extend(dayjsPlugin);
  });

  it("should extend dayjs with calendar methods", () => {
    const d = dayjs("2024-09-02T10:30:00.000Z");
    expect(d.isJalali()).toBe(false);

    const jd = d.calendar("jalali");
    expect(jd.isJalali()).toBe(true);
    expect(jd.year()).toBe(1403);
    expect(jd.month()).toBe(5); // 0-indexed: 5 = Shahrivar (6th month)
    expect(jd.date()).toBe(12);

    const gd = jd.calendar("gregory");
    expect(gd.isJalali()).toBe(false);
    expect(gd.year()).toBe(2024);
  });

  it("should parse jalali dates via { jalali: true } or global calendar", () => {
    const d1 = (dayjs as any)("1403/06/12", { jalali: true });
    expect(d1.isJalali()).toBe(true);
    expect(d1.year()).toBe(1403);
    expect(d1.date()).toBe(12);

    // Test with missing day in parse regex
    const dNoDay = (dayjs as any)("1403-06", { jalali: true });
    expect(dNoDay.year()).toBe(1403);
    expect(dNoDay.month()).toBe(5);
    expect(dNoDay.date()).toBe(1);

    // Test with calendar jalali but Gregorian year string
    const dGregorianString = (dayjs as any)("2024-05-10", { calendar: "jalali" });
    expect(dGregorianString.isJalali()).toBe(true);

    dayjs.calendar("jalali");
    const d2 = dayjs("1403/06/12");
    expect(d2.year()).toBe(1403);

    // reset global calendar
    dayjs.calendar("gregory");
  });

  it("should format jalali dates correctly with custom tokens", () => {
    const d = (dayjs as any)("1403/06/12 14:30:00", { jalali: true });
    expect(d.format("YYYY/MM/DD")).toBe("1403/06/12");
    expect(d.format("YY/M/D")).toBe("03/6/12");
    expect(d.format("jYYYY/jMM/jDD")).toBe("1403/06/12");
    expect(d.format("jYY/jM/jD")).toBe("03/6/12");
    expect(d.format("[Date:] YYYY")).toBe("Date: 1403");
    expect(d.format("MMMM")).toBe("شهریور");
    expect(d.format("MMM")).toBe("Shahrivar");
    expect(d.format("jMMMM")).toBe("شهریور");
    expect(d.format("jMMM")).toBe("Shahrivar");
    expect(d.format()).toBeDefined();

    // Gregorian format
    const gd = dayjs("2024-09-02");
    expect(gd.format("YYYY-MM-DD")).toBe("2024-09-02");
    expect(gd.format("jYYYY/jMM/jDD")).toBe("1403/06/12");
  });

  it("should support year, month, date getters and setters", () => {
    let d = (dayjs as any)("1403/06/12 10:20:30", { jalali: true });
    expect(d.year()).toBe(1403);
    expect(d.month()).toBe(5);
    expect(d.date()).toBe(12);

    d = d.year(1405);
    expect(d.year()).toBe(1405);

    d = d.month(2); // Khordad (3rd month, 0-indexed 2)
    expect(d.month()).toBe(2);

    d = d.date(25);
    expect(d.date()).toBe(25);

    // Gregorian fallback
    const gd = dayjs("2024-09-02");
    expect(gd.year()).toBe(2024);
    expect(gd.month()).toBe(8);
    expect(gd.date()).toBe(2);

    const gdModified = gd.year(2025).month(3).date(10);
    expect(gdModified.year()).toBe(2025);
    expect(gdModified.month()).toBe(3);
    expect(gdModified.date()).toBe(10);
  });

  it("should calculate daysInMonth accurately for Jalali months", () => {
    const farvardin = (dayjs as any)("1403/01/15", { jalali: true });
    expect(farvardin.daysInMonth()).toBe(31);

    const mehr = (dayjs as any)("1403/07/15", { jalali: true });
    expect(mehr.daysInMonth()).toBe(30);

    const esfand1403 = (dayjs as any)("1403/12/15", { jalali: true });
    expect(esfand1403.daysInMonth()).toBe(30); // 1403 is leap

    const esfand1402 = (dayjs as any)("1402/12/15", { jalali: true });
    expect(esfand1402.daysInMonth()).toBe(29); // 1402 is non-leap

    const greg = dayjs("2024-02-15");
    expect(greg.daysInMonth()).toBe(29);
  });

  it("should support startOf and endOf for year and month", () => {
    const d = (dayjs as any)("1403/06/15 14:30:45", { jalali: true });

    const startYear = d.startOf("year");
    expect(startYear.month()).toBe(0);
    expect(startYear.date()).toBe(1);
    expect(startYear.toDate().getHours()).toBe(0);

    const startYearsPlural = d.startOf("years");
    expect(startYearsPlural.date()).toBe(1);

    const startYearFalse = d.startOf("year", false);
    expect(startYearFalse.month()).toBe(11);
    expect(startYearFalse.date()).toBe(30);

    const endYear = d.endOf("year");
    expect(endYear.month()).toBe(11);
    expect(endYear.date()).toBe(30); // 1403 is leap year
    expect(endYear.toDate().getHours()).toBe(23);

    const endYearsPlural = d.endOf("years");
    expect(endYearsPlural.date()).toBe(30);

    const startMonth = d.startOf("month");
    expect(startMonth.date()).toBe(1);

    const startMonthFalse = d.startOf("month", false);
    expect(startMonthFalse.date()).toBe(31);

    const endMonth = d.endOf("month");
    expect(endMonth.date()).toBe(31); // Shahrivar has 31 days

    const endMonthsPlural = d.endOf("months");
    expect(endMonthsPlural.date()).toBe(31);

    const startDay = d.startOf("day");
    expect(startDay.toDate().getHours()).toBe(0);

    const endDay = d.endOf("day");
    expect(endDay.toDate().getHours()).toBe(23);

    // Non-leap end of year
    const dNonLeap = (dayjs as any)("1402/06/15", { jalali: true });
    expect(dNonLeap.endOf("year").date()).toBe(29);

    // Gregorian startOf and endOf
    const gd = dayjs("2024-06-15");
    expect(gd.startOf("month").date()).toBe(1);
    expect(gd.endOf("month").date()).toBe(30);
  });

  it("should support add and subtract for Jalali dates", () => {
    const d = (dayjs as any)("1403/05/10", { jalali: true });

    const nextYear = d.add(1, "year");
    expect(nextYear.year()).toBe(1404);

    const prevYear = d.subtract(1, "year");
    expect(prevYear.year()).toBe(1402);

    const nextMonth = d.add(2, "months");
    expect(nextMonth.month()).toBe(6); // 0-indexed 6 is Mehr

    // Adding months landing in first 6 months (newMonth < 6)
    const farvardin = (dayjs as any)("1403/01/15", { jalali: true });
    const ordibehesht = farvardin.add(1, "month");
    expect(ordibehesht.month()).toBe(1);

    const nextDays = d.add(5, "days");
    expect(nextDays.date()).toBe(15);

    // Adding to 31 Tir across to Shahrivar or Mehr
    const endTir = (dayjs as any)("1403/04/31", { jalali: true });
    const inMehr = endTir.add(3, "months");
    expect(inMehr.month()).toBe(6);
    expect(inMehr.date()).toBe(30);

    // Adding months landing in Esfand of a leap year (1403)
    const toEsfand1403 = (dayjs as any)("1403/06/31", { jalali: true }).add(6, "months");
    expect(toEsfand1403.month()).toBe(11);
    expect(toEsfand1403.date()).toBe(30);

    // Adding months landing in Esfand of a non-leap year (1402)
    const toEsfand1402 = (dayjs as any)("1402/06/31", { jalali: true }).add(6, "months");
    expect(toEsfand1402.month()).toBe(11);
    expect(toEsfand1402.date()).toBe(29);

    // Gregorian add
    const gd = dayjs("2024-05-10");
    expect(gd.add(1, "year").year()).toBe(2025);
  });

  it("should handle format without arguments in Gregorian mode", () => {
    const gd = dayjs("2024-05-10");
    expect(gd.format()).toBeDefined();
  });

  it("should handle invalid date instances gracefully", () => {
    const invalid = dayjs(new Date(NaN)).calendar("jalali");
    expect(isNaN(invalid.year())).toBe(true);
    expect(invalid.format("YYYY/MM/DD")).toBeDefined();
  });

  it("should export jalaliday as an alias", () => {
    expect(jalaliday).toBe(dayjsPlugin);
  });
});
