import toGregorianTime from "../utils/toGregorianTime";

describe("toGregorianTime", () => {
  it("should convert persian date to gregorian date", () => {
    const persianTime = new Date(1403, 6, 12).getTime();
    const gregorianTime = toGregorianTime(persianTime);
    const expectedTime = new Date(2024, 9, 2).getTime();
    expect(gregorianTime).toBe(expectedTime);
  });
});
