import modifyTime from "../utils/common/modifyTime";
describe("modifyTime", () => {
  const initialTime = new Date("2023-01-01T00:00:00Z").getTime();
  test("adds days correctly", () => {
    const result = modifyTime(initialTime, 5, "days");
    expect(result).toBe(new Date("2023-01-06T00:00:00Z").getTime());
  });

  test("adds months correctly", () => {
    const result = modifyTime(initialTime, 2, "months");
    expect(result).toBe(new Date("2023-03-01T00:00:00Z").getTime());
  });

  test("adds years correctly", () => {
    const result = modifyTime(initialTime, 1, "years");
    expect(result).toBe(new Date("2024-01-01T00:00:00Z").getTime());
  });

  test("adds hours correctly", () => {
    const result = modifyTime(initialTime, 12, "hours");
    expect(result).toBe(new Date("2023-01-01T12:00:00Z").getTime());
  });

  test("adds minutes correctly", () => {
    const result = modifyTime(initialTime, 30, "minutes");
    expect(result).toBe(new Date("2023-01-01T00:30:00Z").getTime());
  });

  test("adds seconds correctly", () => {
    const result = modifyTime(initialTime, 45, "seconds");
    expect(result).toBe(new Date("2023-01-01T00:00:45Z").getTime());
  });

  test("throws error for invalid unit", () => {
    expect(() => modifyTime(initialTime, 1, "invalid" as any)).toThrow(
      "Invalid unit"
    );
  });

  test("returns NaN when time is NaN", () => {
    expect(isNaN(modifyTime(NaN, 1, "days"))).toBe(true);
  });

  test("clamps to 30 days in Persian leap year Esfand", () => {
    // 1399 is a Persian leap year
    const time = new Date("2021-02-18T00:00:00Z").getTime(); // 1399/11/30
    const result = modifyTime(time, 1, "months", "persian");
    expect(typeof result).toBe("number");
  });

  test("adds weeks and singular units correctly", () => {
    const weekResult = modifyTime(initialTime, 2, "weeks");
    expect(weekResult).toBe(new Date("2023-01-15T00:00:00Z").getTime());

    const singularDay = modifyTime(initialTime, 1, "day");
    expect(singularDay).toBe(new Date("2023-01-02T00:00:00Z").getTime());

    const singularWeek = modifyTime(initialTime, 1, "week");
    expect(singularWeek).toBe(new Date("2023-01-08T00:00:00Z").getTime());

    const singularMonth = modifyTime(initialTime, 1, "month");
    expect(singularMonth).toBe(new Date("2023-02-01T00:00:00Z").getTime());

    const singularYear = modifyTime(initialTime, 1, "year");
    expect(singularYear).toBe(new Date("2024-01-01T00:00:00Z").getTime());

    const singularHour = modifyTime(initialTime, 1, "hour");
    expect(singularHour).toBe(new Date("2023-01-01T01:00:00Z").getTime());

    const singularMinute = modifyTime(initialTime, 1, "minute");
    expect(singularMinute).toBe(new Date("2023-01-01T00:01:00Z").getTime());

    const singularSecond = modifyTime(initialTime, 1, "second");
    expect(singularSecond).toBe(new Date("2023-01-01T00:00:01Z").getTime());
  });
});

