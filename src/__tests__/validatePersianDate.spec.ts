import DateValidationResult from "../constants/DateValidationResult";
import validatePersianDate from "../utils/validatePersianDate";
import PersianDate from '../PersianDate';

describe("validatePersianDate", () => {
  it("should return PERSIAN_DATE_IS_INVALID", () => {
    expect(validatePersianDate(new Date(2023, 2, 21))).toEqual(
      DateValidationResult.PERSIAN_DATE_IS_INVALID
    );
  });

  it("should return PERSIAN_DATE_IS_INVALID for non leap year", () => {
    expect(validatePersianDate(new PersianDate(1402, 333, 33))).toEqual(
      DateValidationResult.DATE_IS_VALID
    );
  });
});


console.log(new PersianDate(1400, 12, 2).format("YYYY-MM-DD"));
