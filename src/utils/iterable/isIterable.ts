export function isIterable<T = unknown>(
  a: Iterable<T> | unknown,
): a is Iterable<T> {
  return (
    typeof a === "object" &&
    a !== null &&
    typeof (a as Record<string | symbol, unknown>)[Symbol.iterator] ===
      "function"
  );
}
