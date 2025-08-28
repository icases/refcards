// Array utility functions

/**
 * Shuffle an array using the Fisher-Yates algorithm
 */
export function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
