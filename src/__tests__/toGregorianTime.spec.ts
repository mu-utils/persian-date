import toGregorianDate from "../utils/gregorian/toGregorianDate";
import persianToJulianDay from "../utils/persian/persianToJulianDay";
import julianDayToGregorian from "../utils/gregorian/julianDayToGregorian";

describe("toGregorianTime", () => {
  it("should convert persian date 1403/06/13 to gregorian date 2024/09/03", () => {
    const gregorianDate = toGregorianDate(1403, 6, 13);
    const expectedTime = new Date(2024, 8, 3);

    expect(gregorianDate.getFullYear()).toBe(expectedTime.getFullYear());
    expect(gregorianDate.getMonth()).toBe(expectedTime.getMonth());
    expect(gregorianDate.getDate()).toBe(expectedTime.getDate());
  });

  it("should convert persian date 1403/12/06 to gregorian date 2025/02/24", () => {
    const gregorianDate = toGregorianDate(1403, 12, 6);
    const jd = persianToJulianDay(1403, 12, 6);
    const [year, month, day] = julianDayToGregorian(jd);
    const expectedTime = new Date(year, month - 1, day);

    expect(gregorianDate.getFullYear()).toBe(expectedTime.getFullYear());
    expect(gregorianDate.getMonth()).toBe(expectedTime.getMonth());
    expect(gregorianDate.getDate()).toBe(expectedTime.getDate());
  });
});

