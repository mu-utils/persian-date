import gregorianToPersian from "../utils/gregorianToPersian";

describe("gregorianToPersian", () => {
  it("convert gregorian date to persian", () => {
    expect(gregorianToPersian(2024, 9, 3)).toEqual([1403, 6, 13]);
  });
});
