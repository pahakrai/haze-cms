/**
 * chunk a large array to chunkad 2D array
 * @param arr array
 * @param size arra size of each chunk
 */
export function chunkArray<T>(arr: T[], size = 100) {
  return Array.from({length: Math.ceil(arr.length / size)}, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}
