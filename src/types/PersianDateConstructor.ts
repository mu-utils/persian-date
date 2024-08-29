import { MyDate } from "../utils/persianDate";

export default interface PersianDateConstructor {
  //   new (
  //     year: number,
  //     monthIndex: number,
  //     date?: number,
  //     hours?: number,
  //     minutes?: number,
  //     seconds?: number,
  //     ms?: number
  //   ): Date;
  //   prototype: Date;

  new (a: string, b: string): MyDate;
}
