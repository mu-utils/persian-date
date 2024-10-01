import replacePersianNumbers from "../utils/persian/replacePersianNumbers";

describe("replacePersianNumbers", () => {
  it("should replace Persian numbers with English numbers", () => {
    const input = "۱۲۳۴۵۶۷۸۹۰";
    const result = replacePersianNumbers(input);
    expect(result).toEqual("1234567890");
  });
});
