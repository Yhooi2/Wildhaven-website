/**
 * Booking Utilities - Pricing and Date Helpers
 * Moved from reservation/utils to booking model layer
 */

import { isWithinInterval } from "date-fns";

/**
 * Calculate pricing details for a cabin reservation
 * @param {Object} cabin - Cabin object with regularPrice and discount
 * @param {number} numNights - Number of nights for the reservation
 * @returns {Object} Pricing breakdown with regularPrice, discount, nightlyPrice, totalPrice
 */
export function calculatePricing(cabin, numNights) {
  const regularPrice = cabin?.regularPrice || 0;
  const nightlyPrice = regularPrice;
  const totalPrice = numNights * nightlyPrice;

  return {
    regularPrice,
    nightlyPrice,
    totalPrice,
  };
}

/**
 * Format price for display
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  return `$${price}`;
}

/**
 * Calculate total savings from discount
 * @param {number} regularPrice - Regular price per night
 * @param {number} discount - Discount per night
 * @param {number} numNights - Number of nights
 * @returns {number} Total savings amount
 */
export function calculateSavings(regularPrice, discount, numNights) {
  return discount * numNights;
}

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
