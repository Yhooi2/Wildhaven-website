/**
 * Booking Types - Type definitions for booking entity
 */

/**
 * Cabin object structure
 * @typedef {Object} Cabin
 * @property {number} id - Unique cabin identifier
 * @property {string} name - Cabin name
 * @property {string} description - Cabin description
 * @property {number} regularPrice - Regular price per night
 * @property {number} discount - Discount amount per night
 * @property {number} maxCapacity - Maximum number of guests
 * @property {string} image - Cabin image URL
 */

/**
 * Pricing calculation result
 * @typedef {Object} PricingResult
 * @property {number} regularPrice - Original price per night
 * @property {number} discount - Discount amount per night
 * @property {number} nightlyPrice - Final price per night after discount
 * @property {number} totalPrice - Total price for the entire stay
 */

/**
 * Date range for booking
 * @typedef {Object} DateRange
 * @property {Date} from - Start date
 * @property {Date} to - End date
 */

/**
 * Booking settings
 * @typedef {Object} BookingSettings
 * @property {number} minBookingLength - Minimum booking length in nights
 * @property {number} maxBookingLength - Maximum booking length in nights
 */

/**
 * Booked date information
 * @typedef {Object} BookedDate
 * @property {Date} date - Booked date
 * @property {string} reason - Reason for booking (optional)
 */

// Export type definitions for documentation
export const bookingTypes = {
  Cabin: "Cabin object with pricing and capacity information",
  PricingResult: "Result of pricing calculation",
  DateRange: "Date range for booking selection",
  BookingSettings: "Booking configuration settings",
  BookedDate: "Booked date information",
};
