import toGregorianDate from "../utils/gregorian/toGregorianDate";

describe("toGregorianTime", () => {
  it("should convert persian date to gregorian date", () => {
    const gregorianDate = toGregorianDate(1403, 12, 6);
    const expectedTime = new Date(2025, 1, 24);
    expect(gregorianDate.toLocaleDateString()).toBe(
      expectedTime.toLocaleDateString()
    );
  });
});
