export async function* toAsyncIterator<T>(asyncIterable: AsyncIterable<T>): AsyncIterator<T> {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const { done, value } = await asyncIterator.next();
    if (done) break;
    yield value;
  }
}
