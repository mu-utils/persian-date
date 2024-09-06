import TimeZone from "../../types/TimeZone";

export default function normalizeTimeZone(
  time: number,
  timeZone: TimeZone
): number {
  const date = new Date(time);
  const localeTime = date.toLocaleString("en-US", { timeZone });

  return new Date(localeTime).getTime();
}
