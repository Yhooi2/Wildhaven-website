// Cabin Entity - Utilities

import {
  CABIN_STATUSES,
  CABIN_SORT_FIELDS,
  CABIN_SORT_DIRECTIONS,
} from "./cabin-types.js";

/**
 * Filter cabins based on criteria
 * @param {Array} cabins - Array of cabin objects
 * @param {Object} filter - Filter criteria
 * @returns {Array} Filtered cabins
 */
export function filterCabins(cabins, filter = {}) {
  return cabins.filter((cabin) => {
    // Price filter
    if (filter.minPrice && cabin.regularPrice < filter.minPrice) return false;
    if (filter.maxPrice && cabin.regularPrice > filter.maxPrice) return false;

    // Capacity filter
    if (filter.minCapacity && cabin.maxCapacity < filter.minCapacity)
      return false;
    if (filter.maxCapacity && cabin.maxCapacity > filter.maxCapacity)
      return false;

    // Status filter
    if (filter.status && cabin.status !== filter.status) return false;

    // Features filter
    if (filter.features && filter.features.length > 0) {
      const hasAllFeatures = filter.features.every((feature) =>
        cabin.features.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }

    return true;
  });
}

/**
 * Sort cabins by field and direction
 * @param {Array} cabins - Array of cabin objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction (asc/desc)
 * @returns {Array} Sorted cabins
 */
export function sortCabins(
  cabins,
  field = CABIN_SORT_FIELDS.NAME,
  direction = CABIN_SORT_DIRECTIONS.ASC
) {
  const sortedCabins = [...cabins];

  sortedCabins.sort((a, b) => {
    let aValue, bValue;

    switch (field) {
      case CABIN_SORT_FIELDS.PRICE:
        aValue = a.regularPrice;
        bValue = b.regularPrice;
        break;
      case CABIN_SORT_FIELDS.CAPACITY:
        aValue = a.maxCapacity;
        bValue = b.maxCapacity;
        break;
      case CABIN_SORT_FIELDS.NAME:
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
    }

    if (direction === CABIN_SORT_DIRECTIONS.DESC) {
      [aValue, bValue] = [bValue, aValue];
    }

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });

  return sortedCabins;
}

/**
 * Validate cabin data
 * @param {Object} cabin - Cabin object to validate
 * @returns {Object} Validation result { isValid: boolean, errors: Array }
 */
export function validateCabin(cabin) {
  const errors = [];

  if (!cabin.id || typeof cabin.id !== "number") {
    errors.push("Invalid cabin ID");
  }

  if (!cabin.name || typeof cabin.name !== "string") {
    errors.push("Invalid cabin name");
  }

  if (
    !cabin.maxCapacity ||
    typeof cabin.maxCapacity !== "number" ||
    cabin.maxCapacity <= 0
  ) {
    errors.push("Invalid max capacity");
  }

  if (
    !cabin.regularPrice ||
    typeof cabin.regularPrice !== "number" ||
    cabin.regularPrice < 0
  ) {
    errors.push("Invalid regular price");
  }

  if (
    cabin.discount &&
    (typeof cabin.discount !== "number" ||
      cabin.discount < 0 ||
      cabin.discount > 100)
  ) {
    errors.push("Invalid discount percentage");
  }

  if (!cabin.status || !Object.values(CABIN_STATUSES).includes(cabin.status)) {
    errors.push("Invalid cabin status");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate discounted price for cabin
 * @param {Object} cabin - Cabin object
 * @returns {number} Discounted price
 */
export function calculateDiscountedPrice(cabin) {
  if (!cabin.discount || cabin.discount === 0) {
    return cabin.regularPrice;
  }

  return cabin.regularPrice * (1 - cabin.discount / 100);
}

/**
 * Get available cabins
 * @param {Array} cabins - Array of cabin objects
 * @returns {Array} Available cabins
 */
export function getAvailableCabins(cabins) {
  return cabins.filter((cabin) => cabin.status === CABIN_STATUSES.AVAILABLE);
}

/**
 * Find cabin by ID
 * @param {Array} cabins - Array of cabin objects
 * @param {number} id - Cabin ID
 * @returns {Object|null} Found cabin or null
 */
export function findCabinById(cabins, id) {
  return cabins.find((cabin) => cabin.id === id) || null;
}
