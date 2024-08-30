import PersianDate from "../PersianDate";
import formatDate from "../utils/formatDate";

describe("formatDate", () => {
  it("should get year", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(date.getFullYear()).toBe(1402);
  });

  it("should get month", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "MM")).toBe("05");
  });

  it("should get day", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "DD")).toBe("15");
  });

  it("should replace multiple placeholders correctly", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "YYYY/MM/DD")).toBe("1402/05/15");
  });

  it("should deal with surrounding text", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "YYYY, MM, DD")).toBe("1402, 05, 15");
  });

  it("should not replace non-existent placeholders", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "GG EF")).toBe("GG EF");
  });

  it("should handle empty template string", () => {
    const date = new PersianDate(1402, 5, 15);
    expect(formatDate(date, "")).toBe("");
  });
});
