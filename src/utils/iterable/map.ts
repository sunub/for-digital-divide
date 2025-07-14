import { isIterable } from './isIterable';

function* mapSync<A, B>(fn: (a: A) => B, iterable: Iterable<A>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    yield fn(value);
  }
}

async function* mapAsync<A, B>(fn: (a: A) => B, asyncIterable: AsyncIterable<A>) {
  const asyncIteartor = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const { done, value } = await asyncIteartor.next();
    if (done) break;
    yield await fn(value);
  }
}

export function map<A, B>(fn: (a: A) => B, iterable: Iterable<A>): IterableIterator<B>;

export function map<A, B>(fn: (a: A) => B, iterable: AsyncIterable<A>): AsyncIterableIterator<Awaited<B>>;

export function map<A, B>(
  fn: (a: A) => B,
  iterable: Iterable<A> | AsyncIterable<A>
): IterableIterator<B> | AsyncIterableIterator<B> {
  return isIterable(iterable) ? mapSync(fn, iterable) : mapAsync(fn, iterable);
}
