import toPersianDigits from "../utils/persian/toPersianDigits";

describe("toPersianDigits", () => {
  it("should convert English digits to Persian digits", () => {
    expect(toPersianDigits("0123456789")).toBe("۰۱۲۳۴۵۶۷۸۹");
    expect(toPersianDigits(1403)).toBe("۱۴۰۳");
  });

  it("should convert digits within mixed strings", () => {
    expect(toPersianDigits("تاریخ: 1403/06/12")).toBe("تاریخ: ۱۴۰۳/۰۶/۱۲");
    expect(toPersianDigits("ساعت 14:30:00")).toBe("ساعت ۱۴:۳۰:۰۰");
  });

  it("should leave strings without digits unchanged", () => {
    expect(toPersianDigits("سلام")).toBe("سلام");
  });

  it("should handle empty or null/undefined inputs", () => {
    expect(toPersianDigits("")).toBe("");
    expect(toPersianDigits(null as any)).toBe("");
    expect(toPersianDigits(undefined as any)).toBe("");
  });
});
