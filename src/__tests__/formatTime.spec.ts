import formatTime from "../utils/formatters/formatTime";
import createFormatters from "../utils/formatters/createFormatters";

describe("formatTime", () => {
  it("should format the time", () => {
    const time = new Date("2022-04-03").getTime();
    const template = "YYYY-MM-DD";
    const formatters = createFormatters({
      timeZone: "America/New_York",
      calendar: "gregorian",
    });
    const result = formatTime(time, template, formatters);
    expect(result).toBe("2022-04-03");
  });
});
