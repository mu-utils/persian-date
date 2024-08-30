import PersianDate from "../PersianDate";
import DateFormatTemplate from "../types/DateFormatTemplate";
import DateTimeSegment from "../types/DateTimeSegment";

export default function formatDate(
  thisInstance: PersianDate,
  template: DateFormatTemplate
) {
  let result = `${template}`;
  const replacements = createReplacements(thisInstance);

  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, "g"), value);
  }

  return result;
}
function createReplacements(
  thisInstance: PersianDate
): Record<DateTimeSegment, string> {
  const month = thisInstance.getMonth();
  const hours = thisInstance.getHours();
  const stringHours = hours.toString();
  const stringMonth = month.toString();
  const stringYear = thisInstance.getFullYear().toString();
  const stringDate = thisInstance.getDate().toString();
  const localString = thisInstance.toPersianLocalString.bind(thisInstance);

  return {
    YYYY: stringYear.toString(),
    MM: stringMonth.padStart(2, "0"),
    DD: stringDate.padStart(2, "0"),
    HH: stringHours.padStart(2, "0"),
    mm: thisInstance.getMinutes().toString().padStart(2, "0"),
    ss: thisInstance.getSeconds().toString().padStart(2, "0"),
    dddd: localString({ weekday: "long" }),
    MMM: localString({ month: "short" }),
    MMMM: localString({ month: "long" }),
    YY: stringYear.toString().slice(-2),
    D: stringDate,
    ddd: localString({ weekday: "short" }),
    Do: stringDate.padStart(2, "0"),
    M: stringMonth,
    h: stringHours,
    a: hours < 12 ? "am" : "pm",
  };
}
