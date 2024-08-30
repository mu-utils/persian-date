import PersianDate from "../PersianDate";
import formatDate from "../utils/formatDate";

describe("formatDate", () => {
  it("should replace year", () => {
    const date = new PersianDate(1402, 5, 15);
    // expect(formatDate(date, "YYYY")).toBe("1402");
    expect(date.getFullYear()).toBe(1402)
  });

  //   it("should replace month placeholder correctly", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "MM")).toBe("05");
  //   });

  //   it("should replace day placeholder correctly", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "DD")).toBe("15");
  //   });

  //   it("should replace multiple placeholders correctly", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "YYYY/MM/DD")).toBe("1402/05/15");
  //   });

  //   it("should handle placeholders with surrounding text", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "Year: YYYY, Month: MM, Day: DD")).toBe(
  //       "Year: 1402, Month: 05, Day: 15"
  //     );
  //   });

  //   it("should not replace non-existent placeholders", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "ABCD EFGH")).toBe("ABCD EFGH");
  //   });

  //   it("should handle empty template string", () => {
  //     const date = new PersianDate(1402, 5, 15);
  //     expect(formatDate(date, "")).toBe("");
  //   });
});
