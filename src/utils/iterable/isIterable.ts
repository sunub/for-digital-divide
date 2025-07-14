export function isIterable<T = unknown>(a: Iterable<T> | unknown): a is Iterable<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return typeof a === 'object' && a !== null && typeof (a as any)[Symbol.iterator] === 'function';
}
