'use server';

import cookies from 'next/headers';

export function setCookie(name, value) {
  cookies().set(name, value);
}

export function getCookie(name) {
  return cookies().get(name);
}

export function hasCookie(name) {
  return cookies().has(name);
}
