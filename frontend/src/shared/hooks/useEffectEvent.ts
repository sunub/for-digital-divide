import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Polyfill for the experimental useEffectEvent hook.
 * This hook allows you to define an event handler that can read the latest props/state
 * but doesn't trigger effects when it changes.
 */
export function useEffectEvent<T extends (...args: unknown[]) => unknown>(
  handler: T,
): T {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: unknown[]) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []) as T;
}
