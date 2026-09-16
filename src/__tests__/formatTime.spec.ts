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
});

