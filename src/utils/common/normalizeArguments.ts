import Calendar from "../../types/Calendar";
import DateValue from "../../types/DateValue";
import FormatOptions from "../../types/FormatOptions";
import InvalidDateSeverity from "../../types/InvalidDateSeverity";
import Options from "../../types/Options";
import PersianDateOptions from "../../types/PersianDateOptions";
import toGregorianDate from "../gregorian/toGregorianDate";
import createFormatOptions from "../options/createFormatOptions";
import createOptions from "../options/createOptions";
import isValidPersian, { isPersianYear } from "../persian/isValidPersian";
import localizeTime from "./localizeTime";

type NormalizeArguments = [
  time: number,
  options: Options,
  formatOptions: FormatOptions
];

const toIntegerArray = (values: (string | number)[]) =>
  values.map((value) => (typeof value === "number" ? value : parseInt(String(value), 10)));

function extractDateParts(arg: string): number[] | null {
  const result = arg.match(/(\d+)/g);
  return result ? toIntegerArray(result) : null;
}

function setTimeComponents(date: Date, timeParts: number[]): void {
  const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = timeParts;
  date.setHours(hours, minutes, seconds, milliseconds);
}

type ExtractArguments = [
  newArguments: DateValue[],
  options: Options,
  formatOptions: FormatOptions
];

// Main function to extract options and clean arguments
function extractArguments(args: (DateValue | object)[]): ExtractArguments {
  const newArguments: DateValue[] = [];
  let persianDateOptions: PersianDateOptions | undefined;

  if (args.length > 8) {
    throw new Error("Invalid number of arguments");
  }

  for (const arg of args) {
    if (isOptions(arg)) {
      persianDateOptions = arg as PersianDateOptions;
      break;
    }
    newArguments.push(arg);
  }

  const options = createOptions(persianDateOptions);
  const formatOptions = createFormatOptions(persianDateOptions);

  return [newArguments, options, formatOptions];
}

function parseDate(
  args: DateValue[],
  calendar: Calendar,
  invalidDateSeverity: InvalidDateSeverity
): Date | undefined {
  if (args.length === 0 || (args.length === 1 && args[0] === undefined)) {
    return new Date();
  }

  if (args.length === 1) {
    const singleArg = args[0];

    if (singleArg instanceof Date) {
      const t = singleArg.getTime();
      return isNaN(t) ? undefined : new Date(t);
    }

    if (typeof singleArg === "number") {
      return isNaN(singleArg) ? undefined : new Date(singleArg);
    }

    if (typeof singleArg === "string") {
      const dateParts = extractDateParts(singleArg);
      if (!dateParts || dateParts.length === 0) {
        const d = new Date(singleArg);
        return isNaN(d.getTime()) ? undefined : d;
      }

      const [year, month, day = 1, ...timeParts] = dateParts;

      if (calendar === "persian") {
        if (isPersianYear(year)) {
          const valid = isValidPersian(year, month, day);
          if (!valid) {
            if (invalidDateSeverity === "error") {
              throw new Error("Invalid date");
            }
            return undefined;
          }
          const date = toGregorianDate(year, month, day);
          setTimeComponents(date, timeParts);
          return date;
        }

        // Year outside Persian range - check strict mode or parse as Gregorian
        const validPersian = isValidPersian(year, month, day);
        if (invalidDateSeverity === "error" && !validPersian) {
          throw new Error("Invalid date");
        }

        const date = new Date(year, month - 1, day);
        setTimeComponents(date, timeParts);
        return date;
      } else {
        // calendar === "gregorian"
        const validPersian = isValidPersian(year, month, day);
        if (invalidDateSeverity === "error" && validPersian) {
          throw new Error("Invalid date");
        }
        const date = new Date(year, month - 1, day);
        setTimeComponents(date, timeParts);
        return date;
      }
    }
  }

  // args.length >= 2 (e.g. year, month, date?, hours?, minutes?, seconds?, ms?)
  const dateParts = toIntegerArray(args as (string | number)[]);
  const [year, month, day = 1, ...timeParts] = dateParts;

  if (calendar === "persian") {
    const valid = isValidPersian(year, month, day);
    if (!valid) {
      if (invalidDateSeverity === "error") {
        throw new Error("Invalid date");
      }
      return undefined;
    }
    const date = toGregorianDate(year, month, day);
    setTimeComponents(date, timeParts);
    return date;
  } else {
    const date = new Date(year, month - 1, day);
    setTimeComponents(date, timeParts);
    return date;
  }
}

export default function normalizeArguments(
  args: unknown[]
): NormalizeArguments {
  const [newArguments, options, formatOptions] = extractArguments(
    args as (DateValue | object)[]
  );

  let time: number;
  const date = parseDate(
    newArguments,
    options.calendar,
    options.invalidDateSeverity
  );

  if (!date || isNaN(date.getTime())) {
    time = NaN;
  } else {
    time = localizeTime(date.getTime(), formatOptions.timeZone);
  }

  return [time, options, formatOptions];
}

const isOptions = (arg: unknown): arg is object =>
  typeof arg === "object" && arg !== null && !(arg instanceof Date);

