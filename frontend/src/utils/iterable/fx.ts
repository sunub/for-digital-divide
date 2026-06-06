import { chunk } from "./chunk";
import { filter } from "./filter";
import { isIterable } from "./isIterable";
import { map } from "./map";
import { take } from "./take";
import { toAsyncIterable } from "./toAsyncIterable";

async function fromAsync<T>(asyncIterable: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of asyncIterable) {
    result.push(item);
  }
  return result;
}

class FxIterableSync<T> {
  constructor(private iterable: Iterable<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.iterable[Symbol.iterator]();
  }

  map<U>(fn: (value: T) => U) {
    return fx(map(fn, this));
  }

  chunk(limit: number) {
    return fx(chunk(limit, this));
  }

  take(limit: number) {
    return fx(take(limit, this));
  }

  filter(predicate: (value: T) => boolean) {
    return fx(filter(predicate, this));
  }

  toArray(): T[] {
    return [...this];
  }

  toAsync() {
    return fx(toAsyncIterable(this));
  }

  toIterator(): Iterator<T> {
    return this.iterable[Symbol.iterator]();
  }
}

class FxIterableAsync<T> {
  constructor(private asyncIterable: AsyncIterable<T>) {}

  [Symbol.asyncIterator]() {
    return this.asyncIterable[Symbol.asyncIterator]();
  }

  map<U>(fn: (value: T) => Promise<U> | U) {
    return fx(map(fn, this));
  }

  chunk(limit: number) {
    return fx(chunk(limit, this));
  }

  take(limit: number) {
    return fx(take(limit, this));
  }

  filter(predicate: (value: T) => boolean | Promise<boolean>) {
    return fx(filter(predicate, this));
  }

  toAsync() {
    return this;
  }

  toArray(): Promise<T[]> {
    return fromAsync(this);
  }

  toIterator(): AsyncIterator<T> {
    return this.asyncIterable[Symbol.asyncIterator]();
  }
}

export function fx<T>(iterable: Iterable<T>): FxIterableSync<T>;

export function fx<T>(asyncIterable: AsyncIterable<T>): FxIterableAsync<T>;

export function fx<T>(
  iterable: Iterable<T> | AsyncIterable<T>,
): FxIterableSync<T> | FxIterableAsync<T> {
  return isIterable(iterable)
    ? new FxIterableSync(iterable)
    : new FxIterableAsync(iterable);
}
