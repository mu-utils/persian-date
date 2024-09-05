/**
 * Julian Day Number for the Unix epoch.
 *
 * The number `2440588` represents the Julian Day Number for the start of the Unix epoch:
 * January 1, 1970 at midnight UTC. This epoch is used as a reference point in many systems
 * to calculate elapsed time in seconds or milliseconds since this date.
 *
 * Julian Day Number (JDN) is a continuous count of days since the beginning of the Julian Period
 * on January 1, 4713 BC. The JDN `2440588` marks the starting point for Unix time calculations.
 *
 * @constant {number} UNIX_EPOCH_JDN
 */
export const UNIX_EPOCH_JDN = 2440588;

/**
 * The number of milliseconds in a second.
 * 1 second = 1000 milliseconds.
 */
export const MILLISECONDS_PER_SECOND = 1000;

/**
 * The number of milliseconds in a minute.
 * Calculated as:
 * 1 minute = 60 seconds
 * MILLISECONDS_PER_MINUTE = 60 * 1000 = 60000 milliseconds.
 */
export const MILLISECONDS_PER_MINUTE = 60000;

/**
 * The number of milliseconds in an hour.
 * Calculated as:
 * 1 hour = 60 minutes
 * MILLISECONDS_PER_HOUR = 60 * 60000 = 3600000 milliseconds.
 */
export const MILLISECONDS_PER_HOUR = 3600000;

/**
 * The number of milliseconds in a day.
 * Calculated as:
 * 1 day = 24 hours
 * MILLISECONDS_PER_DAY = 24 * 3600000 = 86400000 milliseconds.
 */
export const MILLISECONDS_PER_DAY = 86400000;

/**
 * The number of milliseconds in a year.
 * Calculated as:
 * 1 year = 365.25 days (including leap years)
 * MILLISECONDS_PER_YEAR = 365.25 * 86400000 = 31557600000 milliseconds.
 */
export const MILLISECONDS_PER_YEAR = 31557600000;

/**
 * The number of milliseconds in a month.
 * Calculated as:
 * 1 month = 1/12 of a year
 * MILLISECONDS_PER_MONTH = 31557600000 / 12 = 2629800000 milliseconds.
 */
export const MILLISECONDS_PER_MONTH = 2629800000;
