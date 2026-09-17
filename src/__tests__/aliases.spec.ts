import {
  persianDate,
  jalaliDate,
  shamsiDate,
  PersianDate,
  JalaliDate,
  ShamsiDate,
  gregorianToPersian,
  gregorianToJalali,
  persianToGregorian,
  jalaliToGregorian,
  toPersianDate,
  toJalaliDate,
  isPersianLeapYear,
  isJalaliLeapYear,
} from "../index";

describe("Enterprise Jalali / Shamsi / Persian Aliases", () => {
  it("should have identical factory functions", () => {
    const p = persianDate("1403/06/12");
    const j = jalaliDate("1403/06/12");
    const s = shamsiDate("1403/06/12");

    expect(p.format("YYYY/MM/DD")).toBe("1403/06/12");
    expect(j.format("YYYY/MM/DD")).toBe("1403/06/12");
    expect(s.format("YYYY/MM/DD")).toBe("1403/06/12");
  });

  it("should have identical class references", () => {
    expect(JalaliDate).toBe(PersianDate);
    expect(ShamsiDate).toBe(PersianDate);

    const inst = new JalaliDate("1403/06/12");
    expect(inst instanceof PersianDate).toBe(true);
    expect(inst instanceof Date).toBe(true);
  });

  it("should have identical pure converter functions", () => {
    expect(gregorianToJalali(2024, 9, 2)).toEqual(gregorianToPersian(2024, 9, 2));
    expect(jalaliToGregorian(1403, 6, 12)).toEqual(persianToGregorian(1403, 6, 12));
    expect(toJalaliDate(new Date("2024-09-02T12:00:00Z"))).toEqual(
      toPersianDate(new Date("2024-09-02T12:00:00Z"))
    );
    expect(isJalaliLeapYear(1403)).toBe(isPersianLeapYear(1403));
  });

  it("should handle calendar aliases in options and setCalendar", () => {
    const d1 = persianDate("1403/06/12", { calendar: "jalali" });
    expect(d1.format("YYYY/MM/DD")).toBe("1403/06/12");

    const d2 = persianDate("1403/06/12", { calendar: "shamsi" });
    expect(d2.format("YYYY/MM/DD")).toBe("1403/06/12");

    d1.setCalendar("gregorian");
    expect(d1.format("YYYY/MM/DD")).toBe("2024/09/02");

    d1.setCalendar("jalali");
    expect(d1.format("YYYY/MM/DD")).toBe("1403/06/12");

    d1.setCalendar("shamsi");
    expect(d1.format("YYYY/MM/DD")).toBe("1403/06/12");
  });
});
