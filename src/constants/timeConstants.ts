/**
 * Milliseconds per day.
 *
 * The number `86400000` represents the number of milliseconds in a day.
 * It is derived from the following calculations:
 *
 * - 1000 milliseconds per second
 * - 60 seconds per minute
 * - 60 minutes per hour
 * - 24 hours per day
 *
 * So, the calculation is:
 *
 * `1000 × 60 × 60 × 24 = 86400000`
 *
 * @constant {number} MILLISECONDS_PER_DAY
 */
export const MILLISECONDS_PER_DAY = 86400000;

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
