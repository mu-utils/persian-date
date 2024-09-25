import PersianDate from "../PersianDate";
import formatTime from "../utils/formatters/formatTime";
import createFormatters from "../utils/formatters/createFormatters";

describe("formatDate", () => {
  const formatters = createFormatters({
    timeZone: "America/New_York",
    calendar: "persian",
  });
  const date = new PersianDate("1403/06/12");
  const time = date.getTime();

  it("should get month", () => {
    expect(formatTime(time, "MM", formatters)).toBe("06");
  });

  it("should get day", () => {
    expect(formatTime(time, "DD", formatters)).toBe("12");
  });

  it("should replace multiple placeholders correctly", () => {
    expect(formatTime(time, "YYYY/MM/DD", formatters)).toBe("1403/06/12");
  });

  it("should deal with surrounding text", () => {
    
    expect(formatTime(time, "YYYY, MM, DD", formatters)).toBe("1403, 06, 12");
  });

  it("should not replace non-existent placeholders", () => {
    expect(formatTime(time, "GG EF", formatters)).toBe("GG EF");
  });

  it("should handle empty template string", () => {
    expect(formatTime(time, "", formatters)).toBe("");
  });
});
