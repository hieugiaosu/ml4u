/**
 * Converts a string from normal text to slug.
 * @param {text} string - The string to be converted.
 * @returns {text} - A new string with slug type.
 */
export function convertToSlug(text: string) {
    // Convert to lowercase
    text = text.toLowerCase();
    // Replace & with 'end'
    text = text.replace(/&/g, 'and');
    // Replace non-alphanumeric characters (except spaces) with underscores
    text = text.replace(/[^a-z0-9]+/g, '_');
    // Remove leading/trailing underscores
    text = text.replace(/^_+|_+$/g, '');
    return text;
}

export function convertSnakeCaseToCamelCase(snakeString: string): string {
    return snakeString.split('_').map((word, index) => 
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
}

export function convertToBoolean(value: unknown): boolean {
    if (typeof value === 'string') {
        const lowerValue = value.toLowerCase();
        return lowerValue === 'true' || lowerValue === '1'; // "true" or "1" return true
    }
    return Boolean(value); // Converts other types to boolean
  }

export function escapeCsvField(value: string): string {
    // Check if the field contains any special characters
    if (value.includes('"') || value.includes(',') || value.includes('\n')) {
        // Escape double quotes by doubling them and wrap the entire field in double quotes
        return `"${value.replace(/"/g, '""')}"`;
    }
    // Return the field as-is if no special characters are present
    return value;
}