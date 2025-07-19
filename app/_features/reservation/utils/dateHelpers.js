import { isWithinInterval } from "date-fns";

/**
 * Check if a date range overlaps with any booked dates
 * @param {Object} range - Date range object with from and to properties
 * @param {Array} bookedDates - Array of booked dates
 * @returns {boolean} True if range overlaps with booked dates
 */
export function isRangeOverlappingBookedDates(range, bookedDates) {
  return (
    range.from &&
    range.to &&
    bookedDates.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

/**
 * Check if a date range is valid (has both from and to dates)
 * @param {Object} range - Date range object with from and to properties
 * @returns {boolean} True if range is valid
 */
export function isValidRange(range) {
  return range?.from && range?.to;
}

/**
 * Check if a date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export function isPastDate(date) {
  return date < new Date();
}

/**
 * Format date range for display
 * @param {Object} range - Date range object with from and to properties
 * @returns {string} Formatted date range string
 */
export function formatDateRange(range) {
  if (!isValidRange(range)) return "";

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const fromStr = range.from.toLocaleDateString("en-US", options);
  const toStr = range.to.toLocaleDateString("en-US", options);

  return `${fromStr} - ${toStr}`;
}
