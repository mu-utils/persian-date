import normalizeArguments from "../utils/normalizeArguments";

describe("normalizeArguments", () => {
  it("should return an object with props and options which is undefined", () => {
    const result = normalizeArguments(["2023/01/01"]);
    expect(result).toEqual({
      props: ["2023/01/01"],
      options: undefined,
    });
  });

  it("should return an object with props and options which is has an object", () => {
    const result = normalizeArguments(["2023/01/01", { ignoreCalendar: true }]);
    expect(result).toEqual({
      props: ["2023/01/01"],
      options: { ignoreCalendar: true },
    });
  });

  it("should return props with empty array and options which is undefined", () => {
    const result = normalizeArguments([]);
    expect(result).toEqual({
      props: [],
      options: undefined,
    });
  });

  it("should return props with empty array and options", () => {
    const result = normalizeArguments([{ ignoreCalendar: true }]);
    expect(result).toEqual({
      props: [],
      options: { ignoreCalendar: true },
    });
  });
});
