// Cabin Entity - Types and Interfaces

/**
 * @typedef {Object} Cabin
 * @property {number} id - Unique cabin identifier
 * @property {string} name - Cabin name
 * @property {string} description - Cabin description
 * @property {number} maxCapacity - Maximum number of guests
 * @property {number} regularPrice - Regular price per night
 * @property {number} discount - Discount percentage (0-100)
 * @property {string} image - Cabin image URL
 * @property {string[]} features - List of cabin features
 * @property {string} status - Cabin status (available, booked, maintenance)
 */

/**
 * @typedef {Object} CabinFilter
 * @property {number} minPrice - Minimum price filter
 * @property {number} maxPrice - Maximum price filter
 * @property {number} minCapacity - Minimum capacity filter
 * @property {number} maxCapacity - Maximum capacity filter
 * @property {string[]} features - Required features filter
 * @property {string} status - Status filter
 */

/**
 * @typedef {Object} CabinSort
 * @property {string} field - Field to sort by (price, capacity, name)
 * @property {string} direction - Sort direction (asc, desc)
 */

// Export types for use in other modules
export const CABIN_STATUSES = {
  AVAILABLE: "available",
  BOOKED: "booked",
  MAINTENANCE: "maintenance",
};

export const CABIN_SORT_FIELDS = {
  PRICE: "price",
  CAPACITY: "capacity",
  NAME: "name",
};

export const CABIN_SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};
