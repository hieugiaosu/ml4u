import { convertSnakeCaseToCamelCase } from "./string";

/**
 * Converts an object's keys from snake_case to camelCase.
 * @param {Object} obj - The object to be converted.
 * @returns {Object} - A new object with camelCase keys.
 */
export function convertObjectSnakeKeysToCamelCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => convertObjectSnakeKeysToCamelCase(item));
    }

    return Object.entries(obj).reduce((acc: any, [key, value]) => {
        const camelCaseKey = convertSnakeCaseToCamelCase(key);
        acc[camelCaseKey] = typeof value === 'object' && value !== null
            ? convertObjectSnakeKeysToCamelCase(value)
            : value;
        return acc;
    }, {});
}

/**
 * Converts an object's keys from camelCase to snake_case.
 * @param {Object} obj - The object to be converted.
 * @returns {Object} - A new object with snake_case keys.
 */
export function convertObjectCamelCaseKeysToSnakeCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
  
    if (Array.isArray(obj)) {
      return obj.map(item => convertObjectCamelCaseKeysToSnakeCase(item));
    }
  
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
        const snakeCaseKey = key
        .replace(/([A-Z])/g, '_$1') // Add underscore before uppercase letters.
        .replace(/([a-z])([0-9])/g, '$1_$2') // Add underscore before numbers.
        .toLowerCase(); // Convert everything to lowercase.
      acc[snakeCaseKey] = typeof value === 'object' && value !== null 
        ? convertObjectCamelCaseKeysToSnakeCase(value) 
        : value;
      return acc;
    }, {});
  }
  