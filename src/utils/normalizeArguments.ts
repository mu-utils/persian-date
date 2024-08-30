import PersianDateArguments from "../types/PersianDateArguments";
import PersianDateOptions from "../types/PersianDateOptions";

type DateType = Date | number | string;

interface NormalizeArguments {
  props:
    | []
    | [value: DateType]
    | [
        year: number,
        monthIndex: number,
        date?: number,
        hours?: number,
        minutes?: number,
        seconds?: number,
        ms?: number
      ];
  options: PersianDateOptions | undefined;
}

export default function normalizeArguments(
  args: PersianDateArguments
): NormalizeArguments {
  if (args.length === 1) {
    if (isOptions(args[0])) {
      return { props: [], options: args[0] };
    }

    return { props: args as [DateType], options: undefined };
  }

  if (args.length === 2 && isOptions(args[1])) {
    return { props: [args[0] as DateType], options: args[1] };
  }

  if (args.length === 8) {
    return {
      props: args.slice(0, 6) as [
        number,
        number,
        number,
        number,
        number,
        number
      ],
      options: args[6] as PersianDateOptions | undefined,
    };
  }

  return { props: [], options: undefined };
}

function isOptions(arg: unknown): arg is PersianDateOptions {
  return typeof arg === "object" && !(arg instanceof Date);
}
