import normalizeArguments from "../utils/common/normalizeArguments";

describe("normalizeArguments", () => {
  it("should return correct date", () => {
    const date = new Date(normalizeArguments(["2023/01/01"])[0]);
    expect(date.getDate()).toEqual(1);
  });

  it("should return today date when date is not provided", () => {
    const result = normalizeArguments([]);
    const date = new Date(result[0]);
    const today = new Date();
    expect(date.getMonth()).toEqual(today.getMonth());
  });

  it("should return props with empty array and options", () => {
    const result = normalizeArguments([undefined]);
    const date = new Date(result[0]).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    expect(date).toEqual(today);
  });
});
