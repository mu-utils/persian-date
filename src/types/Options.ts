import PersianDateOptions from "./PersianDateOptions";

type Options = Required<
  Pick<
    PersianDateOptions,
    "calendar" | "ignoreCalendar" | "invalidDateSeverity"
  >
>;

export default Options;
