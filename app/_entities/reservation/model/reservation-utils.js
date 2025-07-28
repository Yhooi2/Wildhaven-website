/**
 * Reservation Utilities - Helper functions for reservation entity
 */

import { isPast } from "date-fns";

/**
 * Get reservation status based on start date
 * @param {string|Date} startDate - Reservation start date
 * @returns {'Upcoming' | 'Past'} Reservation status
 */
export function getReservationStatus(startDate) {
  return isPast(new Date(startDate)) ? "Past" : "Upcoming";
}

/**
 * Format reservation date range for display
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @returns {string} Formatted date range
 */
export function formatReservationDates(startDate, endDate) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const start = new Date(startDate).toLocaleDateString("en-US", options);
  const end = new Date(endDate).toLocaleDateString("en-US", options);

  return `${start} - ${end}`;
}

/**
 * Calculate total nights from date range
 * @param {string} startDate - Start date (ISO string)
 * @param {string} endDate - End date (ISO string)
 * @returns {number} Number of nights
 */
export function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Validate reservation data
 * @param {Object} reservation - Reservation object
 * @returns {boolean} True if reservation is valid
 */
export function isValidReservation(reservation) {
  return (
    reservation?.id &&
    reservation?.cabins &&
    reservation?.startDate &&
    reservation?.endDate &&
    reservation?.numGuests > 0 &&
    reservation?.totalPrice > 0
  );
}

/**
 * Sort reservations by date (newest first)
 * @param {Array} reservations - Array of reservations
 * @returns {Array} Sorted reservations
 */
export function sortReservationsByDate(reservations) {
  return [...reservations].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
}

/**
 * Filter reservations by status
 * @param {Array} reservations - Array of reservations
 * @param {'Upcoming' | 'Past'} status - Status to filter by
 * @returns {Array} Filtered reservations
 */
export function filterReservationsByStatus(reservations, status) {
  return reservations.filter(
    (reservation) => getReservationStatus(reservation.startDate) === status
  );
}
