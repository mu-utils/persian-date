import DateValidationResult from "../constants/dateValidationResult";

type DateValidationResultType =
  (typeof DateValidationResult)[keyof typeof DateValidationResult];

  export default DateValidationResultType;