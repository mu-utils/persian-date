import relativeTime from "../utils/common/fromNow";

describe("relativeTime", () => {
  const now = 1700000000000;

  it("should format seconds (< 45s)", () => {
    expect(relativeTime(now - 30 * 1000, now)).toBe("چند ثانیه پیش");
    expect(relativeTime(now + 30 * 1000, now)).toBe("چند ثانیه بعد");
  });

  it("should format a minute (< 90s)", () => {
    expect(relativeTime(now - 60 * 1000, now)).toBe("یک دقیقه پیش");
    expect(relativeTime(now + 60 * 1000, now)).toBe("یک دقیقه بعد");
  });

  it("should format minutes (< 45m)", () => {
    expect(relativeTime(now - 15 * 60 * 1000, now)).toBe("15 دقیقه پیش");
    expect(relativeTime(now + 20 * 60 * 1000, now)).toBe("20 دقیقه بعد");
  });

  it("should format an hour (< 90m)", () => {
    expect(relativeTime(now - 60 * 60 * 1000, now)).toBe("یک ساعت پیش");
    expect(relativeTime(now + 60 * 60 * 1000, now)).toBe("یک ساعت بعد");
  });

  it("should format hours (< 22h)", () => {
    expect(relativeTime(now - 5 * 3600 * 1000, now)).toBe("5 ساعت پیش");
    expect(relativeTime(now + 10 * 3600 * 1000, now)).toBe("10 ساعت بعد");
  });

  it("should format a day (< 36h)", () => {
    expect(relativeTime(now - 25 * 3600 * 1000, now)).toBe("یک روز پیش");
    expect(relativeTime(now + 30 * 3600 * 1000, now)).toBe("یک روز بعد");
  });

  it("should format days (< 26d)", () => {
    expect(relativeTime(now - 10 * 86400 * 1000, now)).toBe("10 روز پیش");
    expect(relativeTime(now + 15 * 86400 * 1000, now)).toBe("15 روز بعد");
  });

  it("should format a month (< 46d)", () => {
    expect(relativeTime(now - 35 * 86400 * 1000, now)).toBe("یک ماه پیش");
    expect(relativeTime(now + 40 * 86400 * 1000, now)).toBe("یک ماه بعد");
  });

  it("should format months (< 320d)", () => {
    expect(relativeTime(now - 120 * 86400 * 1000, now)).toBe("4 ماه پیش");
    expect(relativeTime(now + 180 * 86400 * 1000, now)).toBe("6 ماه بعد");
  });

  it("should format a year (< 548d)", () => {
    expect(relativeTime(now - 400 * 86400 * 1000, now)).toBe("یک سال پیش");
    expect(relativeTime(now + 450 * 86400 * 1000, now)).toBe("یک سال بعد");
  });

  it("should format years (>= 548d)", () => {
    expect(relativeTime(now - 800 * 86400 * 1000, now)).toBe("2 سال پیش");
    expect(relativeTime(now + 1500 * 86400 * 1000, now)).toBe("4 سال بعد");
  });

  it("should respect withoutSuffix option", () => {
    expect(relativeTime(now - 10 * 86400 * 1000, now, { withoutSuffix: true })).toBe("10 روز");
    expect(relativeTime(now + 10 * 86400 * 1000, now, { withoutSuffix: true })).toBe("10 روز");
  });

  it("should respect digits: fa option", () => {
    expect(relativeTime(now - 10 * 86400 * 1000, now, { digits: "fa" })).toBe("۱۰ روز پیش");
    expect(relativeTime(now + 3 * 3600 * 1000, now, { digits: "fa" })).toBe("۳ ساعت بعد");
  });

  it("should return Invalid Date for invalid timestamps", () => {
    expect(relativeTime(NaN, now)).toBe("Invalid Date");
    expect(relativeTime(now, NaN)).toBe("Invalid Date");
  });
});
