import normalizeTime from "../utils/normalizeTime";

describe("normalizeTime", () => {
  const result = normalizeTime(new Date("2024-06-12").getTime(), {
    calendar: "gregorian",
    ignoreCalendar: false,
    invalidDateSeverity: "default",
    timeZone: "America/New_York",
  });

  it("should return a string", () => {
    expect(typeof result).toBe("number");
  });

  it("should return a string with the correct format", () => {
    expect(result).toBe(1718150400000);
  });
});
