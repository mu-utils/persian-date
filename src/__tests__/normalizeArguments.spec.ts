import normalizeArguments from "../utils/common/normalizeArguments";

describe("normalizeArguments", () => {
  it("should return an tuple of props and options", () => {
    expect(normalizeArguments(["2023/01/01"])).toMatchSnapshot([
      ["2023/01/01"],
      undefined,
    ]);
  });

  it("should return an object with props and options which is has an object", () => {
    const result = normalizeArguments(["2023/01/01", { ignoreCalendar: true }]);
    expect(result).toContain(1675197000000);
  });

  it("should return props with empty array and options which is undefined", () => {
    const result = normalizeArguments([]);
    expect(result[0]).toEqual(NaN);
  });

  it("should return props with empty array and options", () => {
    const result = normalizeArguments([{ ignoreCalendar: true }]);

    console.log(result);
    

    expect(result).toEqual([[], { ignoreCalendar: true }]);
  });
});
