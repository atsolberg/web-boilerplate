/**
 * ARRAY UTILS
 */

import { prop } from './object';
import { identity, required } from './function';

export const arrays = {
  /**
   * Creates a shallow clone of the array.
   * If objects exist in the original array, the references
   * are kept.
   *
   * https://davidwalsh.name/javascript-clone-array
   */
  clone(arr) {
    return arr.slice(0);
  },

  /**
   * Insert an item in an array at the index.
   *
   * USAGE:
   * let months = ['Jan', 'March', 'April'];
   * arrays.insert(months, 1, 'Feb'); // insert at index 1
   * console.log(months); // Array ['Jan', 'Feb', 'March', 'April']
   */
  insert(arr, index, item) {
    if (index < 0) {
      throw new Error('Index must be greater than 0.');
    }
    if (index > this.length - 1) {
      throw new Error(
        `Index must be less than array length. Index: ${index}, Length: ${this.length}`
      );
    }

    arr.splice(index, 0, item);
    return arr;
  },

  /**
   * Add an item or array of items in between every item in the array.
   * @param {Array} arr - The array to weave things into.
   * @param {*} o - The item to weave into the array.
   *        If `o` is an Array then the items of `o` are woven into `arr` sequentially.
   *        If `o` is a function, then the result of o(i) is woven into `arr` sequentially.
   * @param {boolean} before -
   */
  weave(arr, o, before = false) {
    const next = (i) => {
      if (Array.isArray(o)) return o[i];
      if (typeof o === 'function') return o(i);
      return o;
    };

    return arr.reduce((prev, curr, i) => {
      if (before) prev.push(next(i));
      prev.push(curr);
      if (!before && i !== arr.length - 1) prev.push(next(i));
      return prev;
    }, []);
  },

  /** Chunk an array into smaller arrays. */
  chunk(arr, size) {
    const groups = [];

    let i;
    for (i = 0; i < arr.length; i += size) {
      groups.push(arr.slice(i, i + size));
    }
    return groups;
  },

  /**
   * Returns true if two arrays have strictly equal (not equivalent) items.
   * Does NOT account for objects or nested arrays.
   * Order does not matter.
   * @see http://stackoverflow.com/a/16436975
   *
   * USAGE:
   * arrays.equalish([1, 2], [1, 2])           // true
   * arrays.equalish([1, "2"], [1, 2])         // false
   * arrays.equalish(["2", 1], [1, "2"])       // true
   * arrays.equalish([1, [2, 3]], [1, [2, 3]]) // false (The nested arrays are different instances.)
   * arrays.equalish([1, {}], [1, {}])         // false (The nested objects are different instances.)
   */
  equalish(a, b) {
    if (a && !b) return false;
    if (!a && b) return false;
    if (a.length !== b.length) return false;

    const arr1 = [...a];
    const arr2 = [...b];
    arr1.sort();
    arr2.sort();

    for (let i = arr1.length; i--; ) if (arr1[i] !== arr2[i]) return false;

    return true;
  },

  /**
   * Move element at index `from` to index `to` in the `array` provided.
   * @param {Array} arr - The array to modify.
   * @param {Number} from - The index of the item to move.
   * @param {Number} to - The index to move the item to.
   */
  move(arr, from, to) {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  },

  /**
   * Move element at index `from`, `by` a certain amount (negative or positive),
   * in the `array` provided.
   * @param {Array} arr - The array to modify.
   * @param {Number} from - The index of the item to move.
   * @param {Number} by - The number of space to move the element.
   *
   * USAGE:
   * let arr = ['a', 'b', 'c'];
   * arrays.moveBy(arr, 0, 2);  // ['b', 'c', 'a']
   * arrays.moveBy(arr, 2, -2); // ['a', 'b', 'c']
   */
  moveBy(arr, from, by = 1) {
    let newPos = +from + +by;
    const value = arr[from];

    if (newPos < 0) newPos = 0;

    arr.splice(from, 1);
    arr.splice(newPos, 0, value);

    return arr;
  },

  trim(arr, size) {
    if (arr.length > size) return arr.splice(0, size);
    return arr;
  },

  /**
   * Remove the first occurrence of the item found in the
   * array using the predicate. Note this mutates the array.
   * @param {Array} arr - The array to modify.
   * @param {function|number} predicate - function to find the element to remove or the index number itself.
   */
  remove(arr, predicate) {
    if (typeof predicate === 'function') {
      const index = arr.findIndex(predicate);
      if (index !== -1) arr.splice(index, 1);
    } else if (typeof predicate === 'number') {
      arr.splice(predicate, 1);
    }

    return arr;
  },

  /**
   * Combines many filter functions into a single filter function.
   * @param {function(*=)} filters - the filters to combine.
   * @return {function(*=)}
   *
   * USAGE:
   * let even = (x) => x % 2 === 0;
   * let gt_5 = (x) => x > 5;
   * let filter = arrays.combineFilters(even, gt_5);
   * [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(filter);
   * // [6, 8, 10]
   */
  combineFilters(...filters) {
    return function compositeFilter(x) {
      return filters.reduce(function reduceFilters(result, f) {
        return result && f(x);
      }, true);
    };
  },

  /**
   * Add items to the end of an array if needed up to a limit.
   * @param {Array} arr - The array to modify.
   * @param {Number} [to] - the resulting size of the padded array.
   * @param {*} [filler] - the stuffing to use for padding.
   *
   * USAGE:
   * let arr = ['a', 'b', 'c', 'd'];
   * arrays.pad(arr, 10);
   * // ["a", "b", "c", "d", null, null, null, null, null, null]
   *
   */
  pad(arr = required('arr'), to = 0, filler = null) {
    for (let i = arr.length; i < to; i++) {
      if (typeof arr[i] === 'undefined') {
        typeof filler === 'function' ? (arr[i] = filler(i)) : (arr[i] = filler);
      }
    }

    return arr;
  },

  /**
   * Returns a new array such that it contains a distinct set of values from the
   * orginal array, i.e. all duplicates are removed.
   * @param {Array} arr - the the array to work on.
   * @returns {Array} - a new array with distinct values, order is preserved.
   *
   * USAGE:
   * const names = ["Mike","Matt","Nancy","Adam","Jenny","Nancy","Carl"];
   * // ['Mike', 'Matt', 'Nancy', 'Adam', 'Jenny', 'Carl']
   *
   */
  uniq(arr = required('arr')) {
    return arr.reduce((a, b) => {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);
  },

  /**
   * Sort an array by using the items indexes in an ordered array.
   * @param {Array} arr - the array to sort.
   * @param {Array} order - the ordered array to reference for sorting.
   * @param {function} [getValue] - an optional function to fetch the value to sort by.
   */
  sortByIndex(arr, order, getValue = identity) {
    arr.sort((a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      let indexA = order.indexOf(valueA);
      let indexB = order.indexOf(valueB);

      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;

      return indexA - indexB;
    });

    return arr;
  },

  /**
   * Build an array sort function by using the items indexes in an ordered array.
   * @param {Array} order - the ordered array to reference for sorting.
   * @param {function} [getValue] - an optional function to fetch the value to sort by.
   */
  sorterByIndex(order, getValue = identity) {
    return (a, b) => {
      const valueA = getValue(a);
      const valueB = getValue(b);

      let indexA = order.indexOf(valueA);
      let indexB = order.indexOf(valueB);

      if (indexA === -1) indexA = 999;
      if (indexB === -1) indexB = 999;

      return indexA - indexB;
    };
  }
};

/** Common reducer callbacks. */
export const reducers = {
  /** Entity table mapped by item 'id'. */
  id: (acc, item) => {
    acc[item.id] = item;
    return acc;
  },

  /**
   * Create a reducer to build an entity table mapped by item `field`.
   * @param {string} field - the property name or property path of the id.
   */
  by: (field) => (acc, item) => {
    acc[prop(item, field)] = item;
    return acc;
  }
};

/**
 * Build an entity table for an array.
 * @param {Array} arr - the array to convert to an entity table.
 * @param {String} [by] - the array item's property to map by. Default: `id`.
 */
export const entityTable = (arr, by = 'id') => {
  const reducer = by === 'id' ? reducers.id : reducers.by(by);
  const table = { byId: arr.reduce(reducer, {}) };
  table.allIds = arr.map((o) => o[by]);

  return table;
};
