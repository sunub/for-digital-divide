'use client';

const isBrowser = typeof window !== 'undefined';

const localStorageWrapper = {
  get<T>(key: string): T | null {
    if (!isBrowser) {
      return null;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error(`Error getting item "${key}" from localStorage`, error);
      return null;
    }
  },
  set<T>(key: string, value: T): void {
    if (!isBrowser) {
      return;
    }

    try {
      const item = JSON.stringify(value);
      window.localStorage.setItem(key, item);
    } catch (error) {
      console.error(`Error setting item "${key}" in localStorage`, error);
    }
  },
  remove(key: string): void {
    if (!isBrowser) {
      return;
    }
    window.localStorage.removeItem(key);
  },
  clear(): void {
    if (!isBrowser) {
      return;
    }
    window.localStorage.clear();
  },
};

export const localStorage = localStorageWrapper;
