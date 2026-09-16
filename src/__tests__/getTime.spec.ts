import getTime from "../utils/common/getTime";

describe("getTime", () => {
  it("should extract timestamp from a Date instance", () => {
    const d = new Date(1600000000000);
    expect(getTime(d)).toBe(1600000000000);
  });

  it("should extract timestamp from a Persian date string", () => {
    const timestamp = getTime("1402/01/01");
    expect(typeof timestamp).toBe("number");
    expect(isNaN(timestamp)).toBe(false);
  });

  it("should return the number when a numeric timestamp is provided", () => {
    expect(getTime(1600000000000)).toBe(1600000000000);
  });
});
