import { isIterable } from './isIterable';

function* filterSync<T>(predicate: (item: T) => Promise<boolean> | boolean, iterable: Iterable<T>): Generator<T> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

async function* filterAsync<T>(
  predicate: (value: T) => Promise<boolean> | boolean,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<T> {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const { done, value } = await asyncIterator.next();
    if (done) break;
    if (await predicate(value)) {
      yield value;
    }
  }
}

export function filter<A>(fn: (a: A) => boolean | Promise<boolean>, iterable: Iterable<A>): IterableIterator<A>;

export function filter<A>(
  fn: (a: A) => boolean | Promise<boolean>,
  iterable: AsyncIterable<A>
): AsyncIterableIterator<A>;

export function filter<A>(
  fn: (a: A) => boolean | Promise<boolean>,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<A> | AsyncIterableIterator<A> {
  return isIterable(iterable) ? filterSync(fn, iterable) : filterAsync(fn, iterable);
}
