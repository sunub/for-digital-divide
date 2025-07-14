import { isIterable } from './isIterable';
import { take } from './take';

function* chunkSync<T>(limit: number, iterable: Iterable<T>): IterableIterator<T[]> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(limit, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < limit) break;
  }
}

async function* chunkAsync<T>(limit: number, asyncIterable: AsyncIterable<T>): AsyncIterableIterator<T[]> {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const chunks = [];
    for await (const v of take(limit, {
      [Symbol.asyncIterator]() {
        return asyncIterator;
      },
    })) {
      chunks.push(v);
    }
    if (chunks.length) yield chunks;
    if (chunks.length < limit) break;
  }
}

export function chunk<A>(limit: number, iterable: Iterable<A>): IterableIterator<A[]>;

export function chunk<A>(limit: number, iterable: AsyncIterable<A>): AsyncIterableIterator<A[]>;

export function chunk<A>(
  limit: number,
  iterable: Iterable<A> | AsyncIterable<A>,
): IterableIterator<A[]> | AsyncIterableIterator<A[]> {
  return isIterable(iterable) ? chunkSync(limit, iterable) : chunkAsync(limit, iterable);
}
