import PersianDate from "../PersianDate";
import PersianDateArguments from "../types/PersianDateArguments";

function persianDate(...args: PersianDateArguments): PersianDate {
  return new PersianDate(...args);
}

export default persianDate;
