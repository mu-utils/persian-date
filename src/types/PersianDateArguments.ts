import PersianDateOptions from "./PersianDateOptions";

type PersianDateArguments =
  | [options?: PersianDateOptions]
  | [value: Date | number | string, options?: PersianDateOptions]
  | [
      year: number,
      monthIndex: number,
      date?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
      ms?: number,
      options?: PersianDateOptions
    ];

export default PersianDateArguments;
