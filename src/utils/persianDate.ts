import PersianDate from "../PersianDate";
import PersianDateArguments from "../types/PersianDateArguments";
import PersianDateOptions from "../types/PersianDateOptions";

function persianDate(...args: PersianDateArguments): PersianDate {
  return new PersianDate(...args);
}

export default persianDate;
