import normalizeTime from "../utils/common/normalizeTime";

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

  it("should throw error for NaN when invalidDateSeverity is error", () => {
    expect(() =>
      normalizeTime(
        NaN,
        {
          calendar: "persian",
          ignoreCalendar: false,
          invalidDateSeverity: "error",
        },
        { calendar: "persian", timeZone: "UTC" }
      )
    ).toThrow("Invalid Date");
  });

  it("should return NaN when invalidDateSeverity is default", () => {
    const res = normalizeTime(
      NaN,
      {
        calendar: "persian",
        ignoreCalendar: false,
        invalidDateSeverity: "default",
      },
      { calendar: "persian", timeZone: "UTC" }
    );
    expect(isNaN(res)).toBe(true);
  });

  it("should handle persian year in persian calendar mode", () => {
    expect(() =>
      normalizeTime(
        1400,
        {
          calendar: "persian",
          ignoreCalendar: false,
          invalidDateSeverity: "error",
        },
        { calendar: "persian" }
      )
    ).toThrow("Invalid Date");

    const res = normalizeTime(
      1400,
      {
        calendar: "persian",
        ignoreCalendar: false,
        invalidDateSeverity: "default",
      },
      { calendar: "persian" }
    );
    expect(isNaN(res)).toBe(true);
  });
});

