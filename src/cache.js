/**
 * A very simple cache to hold a limited number of entries.
 * Once the limit is reached, the oldest entry is evicted from the cache.
 */
class MicroCache {
  /**
   * @param {Number} [maxSize] - the number of entries to hold, default is 20.
   */
  constructor(maxSize = 20) {
    this.maxSize = maxSize;
    this.map = new Map();
    this.entries = [];
  }

  has(key) {
    return this.map.has(key);
  }

  get(key) {
    return this.map.get(key);
  }

  put(key, value) {
    if (!this.map.has(key)) {
      this.entries.push(key);

      if (this.entries.length > this.maxSize) {
        // Evict the oldest entry
        const evicted = this.entries.shift();
        this.map.delete(evicted);
      }
    }

    return this.map.set(key, value);
  }
}

export default MicroCache;
