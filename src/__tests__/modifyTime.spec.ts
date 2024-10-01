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
});
