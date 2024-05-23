/*
 * Returns random Int between 0 (inclusive) and max (exclusive)
 */
export const getRandomInt = (max: number) => Math.floor(Math.random() * max)

/*
 * Gets random item from array based on its probability
 */
export const getRandomItem = <T>(array: T[]): T => {
  const index = getRandomInt(array.length)
  return array[index]
}
