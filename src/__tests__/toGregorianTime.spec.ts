import toGregorianDate from "../utils/gregorian/toGregorianDate";
import persianToJulianDay from "../utils/persian/persianToJulianDay";
import toG from "../utils/gregorian/julianDayToGregorian";
import julianDayToGregorian from "../utils/gregorian/julianDayToGregorian";

describe("toGregorianTime", () => {
  it("should convert persian date to gregorian date", () => {
    const gregorianDate = toGregorianDate(1403, 12, 6);

    const jd = persianToJulianDay(1403, 12, 6);

    const expectedTime = new Date(2024, 8, 3);
    const [year, month, day] = julianDayToGregorian(jd);

    console.log(gregorianDate);
    console.log(new Date(new Date().setFullYear(year, month - 1, day)));

    expect(gregorianDate.toLocaleDateString()).toBe(
      expectedTime.toLocaleDateString()
    );
  });
});
