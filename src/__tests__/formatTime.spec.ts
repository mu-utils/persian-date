import formatTime from "../utils/formatTime";
import createFormatters from "../utils/createFormatters";

describe("formatTime", () => {
  it("should format the time", () => {
    const time = 1680384000000;
    const template = "YYYY-MM-DD";
    const formatters = createFormatters({
      ignoreCalendar: false,
      timeZone: "America/New_York",
      invalidDateSeverity: "error",
      calendar: "persian",
    });
    const result = formatTime(time, template, formatters);
    expect(result).toBe("2023-04-02");
  });
});
