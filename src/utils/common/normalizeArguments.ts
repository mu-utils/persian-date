import Calendar from "../../types/Calendar";
import DateValue from "../../types/DateValue";
import FormatOptions from "../../types/FormatOptions";
import InvalidDateSeverity from "../../types/InvalidDateSeverity";
import Options from "../../types/Options";
import PersianDateOptions from "../../types/PersianDateOptions";
import toGregorianDate from "../gregorian/toGregorianDate";
import createFormatOptions from "../options/createFormatOptions";
import createOptions from "../options/createOptions";
import isValidPersian from "../persian/isValidPersian";
import localizeTime from "./localizeTime";

type NormalizeArguments = [
  time: number,
  options: Options,
  formatOptions: FormatOptions
];

const toIntegerArray = (values: string[]) =>
  values.map((value) => parseInt(value, 10));

function extractDateParts(arg: string): number[] | null {
  const result = arg.match(/(\d+)/g);

  return result ? toIntegerArray(result) : null;
}

function setTimeComponents(date: Date, timeParts: number[]): void {
  const [hours, minutes, seconds, milliseconds] = timeParts;

  if (hours !== undefined) date.setHours(hours);
  if (minutes !== undefined) date.setMinutes(minutes);
  if (seconds !== undefined) date.setSeconds(seconds);
  if (milliseconds !== undefined) date.setMilliseconds(milliseconds);
}

type ExtractArguments = [
  newArguments: DateValue[],
  options: Options,
  formatOptions: FormatOptions
];

// Main function to normalize arguments
function extractArguments(args: (DateValue | object)[]): ExtractArguments {
  let newArguments: DateValue[] = [];
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
  let date: Date | undefined;
  let dateParts: number[] = [];

  if (args.length === 1) {
    if (typeof args[0] === "string") {
      const result = extractDateParts(args[0]);

      if (!result) {
        return;
      }

      dateParts = result;
    }
  } else {
    dateParts = toIntegerArray(args as string[]);
  }

  if (dateParts.length === 0) {
    const date = new Date();
    dateParts = [date.getFullYear(), date.getMonth(), date.getDate()];
  }

  const [year, month, day, ...rest] = dateParts;
  const validPersian = isValidPersian(year, month, day);

  if (
    invalidDateSeverity === "error" &&
    ((calendar === "persian" && !validPersian) ||
      (calendar === "gregorian" && validPersian))
  ) {
    throw new Error("Invalid date");
  }

  if (validPersian) {
    date = toGregorianDate(year, month, day);

    date.setUTCHours(0, 0, 0, 0);

    console.log(date.toLocaleDateString("fa-ir"), 'valid');
    
  } else {
    date = new Date();
    date.setFullYear(year, month, day);
  }

  setTimeComponents(date, rest);

  return date;
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

  if (!date) {
    time = NaN;
  } else {
    time = localizeTime(date.getTime(), formatOptions.timeZone);
  }

  return [time, options, formatOptions];
}

const isOptions = (arg: unknown): arg is object =>
  typeof arg === "object" && !(arg instanceof Date);
