/**
 * Calculate pricing details for a cabin reservation
 * @param {Object} cabin - Cabin object with regularPrice and discount
 * @param {number} numNights - Number of nights for the reservation
 * @returns {Object} Pricing breakdown with regularPrice, discount, nightlyPrice, totalPrice
 */
export function calculatePricing(cabin, numNights) {
  const regularPrice = cabin?.regularPrice || 0;
  const discount = cabin?.discount || 0;
  const nightlyPrice = regularPrice - discount;
  const totalPrice = numNights * nightlyPrice;

  return {
    regularPrice,
    discount,
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
