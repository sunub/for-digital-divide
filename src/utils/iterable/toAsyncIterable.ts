export async function* toAsyncIterable<T>(syncIterable: Iterable<T>) {
  for (const item of syncIterable) {
    yield item;
  }
}
