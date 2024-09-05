import PersianDate from "../../PersianDate";
import PersianDateOptions from "../../types/PersianDateOptions";
import toGregorianTime from "../gregorian/toGregorianTime";
import isValidPersian from "../persian/isValidPersian";

type NormalizeArguments = [
  newArguments: unknown[],
  options: PersianDateOptions | undefined
];

export default function normalizeArguments(
  args: unknown[]
): NormalizeArguments {
  let newArguments: unknown[] = [];
  let options: PersianDateOptions | undefined = undefined;

  if (args.length > 8) {
    throw new Error("Invalid number of arguments");
  }

  for (const arg of args) {
    if (!isOptions(arg)) {
      if (typeof arg === "string") {
        const result = arg.match(/(\d+)/g);

        if (result?.length) {
          const [year, month, day, ...rest] = result.map(
            (value) => parseInt(value, 10)
          );

          if (isValidPersian(year, month, day)) {
            const date = toGregorianTime(year, month, day);
            // add another
            newArguments.push(date);
          }
        }
      }

      newArguments.push(arg);
    } else {
      options = arg;
    }
  }

  return [newArguments, options];
}

const isOptions = (arg: unknown): arg is PersianDateOptions =>
  typeof arg === "object" && !(arg instanceof PersianDate);
