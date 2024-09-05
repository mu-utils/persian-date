import PersianDate from "../../PersianDate";
import PersianDateOptions from "../../types/PersianDateOptions";

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
      newArguments.push(arg);
    } else {
      options = arg;
    }
  }

  return [newArguments, options];
}

const isOptions = (arg: unknown): arg is PersianDateOptions =>
  typeof arg === "object" && !(arg instanceof PersianDate);
