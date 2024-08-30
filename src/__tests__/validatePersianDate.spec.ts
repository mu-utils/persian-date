import validatePersianDate from "../utils/validatePersianDate";
import dateValidationResult from "../constants/dateValidationResult";

describe("validatePersianDate", () => {
  it("should return PERSIAN_DATE_IS_INVALID", () => {
    expect(validatePersianDate(2023, 2, 21)).toEqual(
      dateValidationResult.PERSIAN_DATE_IS_INVALID
    );
  });

  it("should return PERSIAN_DATE_IS_INVALID for non leap year", () => {
    expect(validatePersianDate(1402, 12, 31)).toEqual(
      dateValidationResult.DATE_IS_INVALID
    );
  });

  it("should return DATE_IS_VALID", () => {
    expect(validatePersianDate(1402, 12, 29)).toEqual(
      dateValidationResult.DATE_IS_VALID
    );
  });

  it("should return DATE_IS_VALID for leap year", () => {
    expect(validatePersianDate(1399, 12, 30)).toEqual(
      dateValidationResult.DATE_IS_VALID
    );
  });
});
