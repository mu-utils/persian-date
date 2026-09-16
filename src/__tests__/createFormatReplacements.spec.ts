import createFormatters from "../utils/formatters/createFormatters";
import createFormatReplacements from "../utils/formatters/createFormatReplacements";

describe("createFormatReplacements", () => {
  const date = new Date(2023, 3, 1);
  const formatters = createFormatters({
    timeZone: "America/New_York",
    calendar: "persian",
  });
  const replacements = createFormatReplacements(date.getTime(), formatters);

  it("should create replacements for the given", () => {
    expect(replacements.D).toBe("11");
  });

  it("should create replacements have correct day name", () => {
    expect(replacements.dddd).toBe("جمعه");
    expect(replacements.ddd).toBeDefined();
    expect(replacements.jMMMM).toBeDefined();
    expect(replacements.jMMM).toBeDefined();
  });

  it("should expose hh (padded 12-hour) token", () => {
    // date = new Date(2023, 3, 1) local time at midnight -> h12 = 12
    expect(replacements.hh).toMatch(/^\d{2}$/);
    expect(replacements.h).toBeDefined();
  });
});
