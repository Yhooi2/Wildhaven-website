/**
 * Reservation Types - Type definitions for reservation entity
 */

/**
 * Reservation object structure
 * @typedef {Object} Reservation
 * @property {number} id - Unique reservation identifier
 * @property {Object} cabins - Cabin information
 * @property {number} cabins.id - Cabin ID
 * @property {string} cabins.name - Cabin name
 * @property {string} cabins.image - Cabin image URL
 * @property {number} numNights - Number of nights
 * @property {string} startDate - Start date (ISO string)
 * @property {string} endDate - End date (ISO string)
 * @property {number} totalPrice - Total price for the reservation
 * @property {number} numGuests - Number of guests
 * @property {string} created_at - Creation timestamp
 */

/**
 * Reservation status types
 * @typedef {'Upcoming' | 'Past' | 'Cancelled'} ReservationStatus
 */

/**
 * Reservation form data
 * @typedef {Object} ReservationFormData
 * @property {Date} startDate - Start date
 * @property {Date} endDate - End date
 * @property {number} numGuests - Number of guests
 * @property {string} guestName - Guest name
 * @property {string} email - Guest email
 */

/**
 * Reservation context state
 * @typedef {Object} ReservationContextState
 * @property {Object|null} range - Selected date range
 * @property {number|null} cabinId - Selected cabin ID
 * @property {function} setRange - Function to set date range
 * @property {function} setCabinId - Function to set cabin ID
 * @property {function} resetRange - Function to reset date range
 */

// Export type definitions for documentation
export const reservationTypes = {
  Reservation: "Complete reservation object with all details",
  ReservationStatus: "Status of reservation (Upcoming, Past, Cancelled)",
  ReservationFormData: "Form data for creating/editing reservations",
  ReservationContextState: "Context state for reservation management",
};
