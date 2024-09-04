import normalizeTime from "../utils/normalizeTime";

describe("normalizeTime", () => {
  const time = new Date("2023-06-12T03:05:03").getTime();
  const result = normalizeTime(
    time,
    {
      calendar: "gregorian",
      ignoreCalendar: false,
      invalidDateSeverity: "default",
    },
    {
      calendar: "gregorian",
      timeZone: "America/New_York",
    }
  );

  it("should return a string", () => {
    expect(typeof result).toBe("number");
  });

  it("should return a string with the correct format", () => {
    expect(result).toBe(1686499503000);
  });
});
