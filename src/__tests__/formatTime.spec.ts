import formatTime from "../utils/formatters/formatTime";
import createFormatters from "../utils/formatters/createFormatters";

describe("formatTime", () => {
  it("should format the time", () => {
    const time = new Date("2022-04-03").getTime();
    const formatters = createFormatters({
      timeZone: "UTC",
    });
    const result = formatTime(time, "YYYY-MM-DD", formatters);
    expect(result).toBe("2022-04-03");
  });

  it("should return Invalid Date when time is NaN", () => {
    const formatters = createFormatters({ timeZone: "UTC" });
    expect(formatTime(NaN, "YYYY-MM-DD", formatters)).toBe("Invalid Date");
  });

  it("should handle unmatched or static tokens", () => {
    const formatters = createFormatters({ timeZone: "UTC" });
    const time = new Date("2022-04-03").getTime();
    expect(formatTime(time, "UNKNOWN_TOKEN", formatters)).toBe("UNKNOWN_TOKEN");
  });

  it("should format hh (12-hour padded) token", () => {
    const formatters = createFormatters({ timeZone: "UTC" });
    // 2022-04-03T00:00:00Z -> 12-hour = 12 -> hh = "12"
    const time = new Date("2022-04-03T00:00:00.000Z").getTime();
    const result = formatTime(time, "hh", formatters);
    expect(result).toMatch(/^\d{2}$/);

    // 2022-04-03T09:00:00Z -> 12-hour = 9 -> hh = "09"
    const time9 = new Date("2022-04-03T09:00:00.000Z").getTime();
    const result9 = formatTime(time9, "hh", formatters);
    expect(result9).toBe("09");
  });
});
