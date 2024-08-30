import DateValidationResult from "../constants/DateValidationResult";

type DateValidationResultType =
  (typeof DateValidationResult)[keyof typeof DateValidationResult];

  export default DateValidationResultType;