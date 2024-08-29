import PersianDate from "../PersianDate";
import PersianDateArguments from "../types/PersianDateArguments";
import PersianDateConstructor from "../types/PersianDateConstructor";
import PersianDateOptions from "../types/PersianDateOptions";

function persianDate(...args: PersianDateArguments): PersianDate {
  return new PersianDate(...args);
}

export default persianDate;

type MyDateArguments =
  | []
  | [number]
  | [string]
  | [Date]
  | [number, number?, number?, number?, number?, number?, number?];

class MyDate extends Date {
  constructor(options?: PersianDateOptions);
  constructor(value: Date, options?: PersianDateOptions);
  constructor(value: number, options?: PersianDateOptions);
  constructor(value: string, options?: PersianDateOptions);
  constructor(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number,
  );

  // write constructor for year month and so on

  constructor() {
    super();
  }

  customMethod() {
    console.log("This is a custom method in MyDate");
  }
}

new MyDate();
