import toGregorianDate from "../utils/gregorian/toGregorianDate";

describe("toGregorianTime", () => {
  it("should convert persian date to gregorian date", () => {
    const gregorianDate = toGregorianDate(1403, 6, 12);
    const expectedTime = new Date(2024, 8, 3);

    console.log(gregorianDate.toDateString());
    console.log(expectedTime.toDateString());

    expect(gregorianDate.toLocaleDateString()).toBe(
      expectedTime.toLocaleDateString()
    );
  });
});
