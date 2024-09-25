import createFormatters from "../utils/formatters/createFormatters";
import createFormatReplacements from "../utils/formatters/createFormatReplacements";

describe("createFormatReplacements", () => {
  it("should create replacements for the given date", () => {
    const date = new Date(2023, 3, 1);
    const formatters = createFormatters({
      timeZone: "America/New_York",
      calendar: "persian",
    });
    const replacements = createFormatReplacements(date.getTime(), formatters);

    console.log(replacements);

    expect(replacements).toEqual({
      YYYY: "2023",
      MM: "04",
      DD: "01",
      HH: "00",
      mm: "00",
      ss: "00",
      dddd: "جمعه",
      MMM: "فروردین",
      MMMM: "فروردین",
      YY: "23",
      D: "1",
      ddd: "جمعه",
      Do: "01",
      M: "4",
      h: "12",
      a: "am",
    });
  });
});
