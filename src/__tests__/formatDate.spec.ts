import PersianDate from "../PersianDate";
import formatDate from "../utils/common/formatTime";
import createFormatters from "../utils/formatters/createFormatters";

describe("formatDate", () => {
  const formatters = createFormatters({
    timeZone: "America/New_York",
  });
  const date = new PersianDate("1403/06/12");
  const time = date.getTime();

  it("should get month", () => {
    expect(formatDate(time, "MM", formatters)).toBe("06");
  });

  it("should get day", () => {
    expect(formatDate(time, "DD", formatters)).toBe("12");
  });

  it("should replace multiple placeholders correctly", () => {
    expect(formatDate(time, "YYYY/MM/DD", formatters)).toBe("1403/06/12");
  });

  it("should deal with surrounding text", () => {
    expect(formatDate(time, "YYYY, MM, DD", formatters)).toBe("1403, 06, 12");
  });

  it("should not replace non-existent placeholders", () => {
    expect(formatDate(time, "GG EF", formatters)).toBe("GG EF");
  });

  it("should handle empty template string", () => {
    expect(formatDate(time, "", formatters)).toBe("");
  });
});
