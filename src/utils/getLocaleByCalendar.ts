import Calendar from "../types/Calendar";

const getLocaleByCalendar = (calendar: Calendar): string =>
  calendar === "gregorian" ? "en-US" : "fa-IR";

export default getLocaleByCalendar;
