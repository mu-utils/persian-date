import toPersianDigits from "../persian/toPersianDigits";

export interface RelativeTimeOptions {
  withoutSuffix?: boolean;
  digits?: "en" | "fa";
}

/**
 * Calculates human-readable relative time string in Persian.
 *
 * @param {number} fromTime - The target timestamp.
 * @param {number} toTime - The reference timestamp (usually now).
 * @param {RelativeTimeOptions} [options] - Configuration options.
 * @returns {string} Human-readable relative time description in Persian.
 */
export default function relativeTime(
  fromTime: number,
  toTime: number,
  options: RelativeTimeOptions = {}
): string {
  if (isNaN(fromTime) || isNaN(toTime)) {
    return "Invalid Date";
  }

  const diffSec = Math.round((toTime - fromTime) / 1000);
  const isPast = diffSec >= 0;
  const absSec = Math.abs(diffSec);

  let text = "";
  if (absSec < 45) {
    text = "چند ثانیه";
  } else if (absSec < 90) {
    text = "یک دقیقه";
  } else if (absSec < 45 * 60) {
    text = `${Math.round(absSec / 60)} دقیقه`;
  } else if (absSec < 90 * 60) {
    text = "یک ساعت";
  } else if (absSec < 22 * 3600) {
    text = `${Math.round(absSec / 3600)} ساعت`;
  } else if (absSec < 36 * 3600) {
    text = "یک روز";
  } else if (absSec < 26 * 86400) {
    text = `${Math.round(absSec / 86400)} روز`;
  } else if (absSec < 46 * 86400) {
    text = "یک ماه";
  } else if (absSec < 320 * 86400) {
    text = `${Math.round(absSec / (30 * 86400))} ماه`;
  } else if (absSec < 548 * 86400) {
    text = "یک سال";
  } else {
    text = `${Math.round(absSec / (365 * 86400))} سال`;
  }

  let result = text;
  if (!options.withoutSuffix) {
    result = isPast ? `${text} پیش` : `${text} بعد`;
  }

  if (options.digits === "fa") {
    result = toPersianDigits(result);
  }

  return result;
}
