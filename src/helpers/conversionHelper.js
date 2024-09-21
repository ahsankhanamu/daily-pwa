// src/helpers/conversionHelper.js

export const convertToFeetAndInches = (valueInMeters) => {
  const totalInches = valueInMeters * 39.3701; // Convert meters to inches
  const feet = Math.floor(totalInches / 12);
  const inches = (totalInches % 12).toFixed(2);
  return { feet, inches };
};
