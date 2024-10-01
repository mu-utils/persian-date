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
});
