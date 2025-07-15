'use client';

import { z } from 'zod';
import { atomWithStorage } from 'jotai/utils';

const StepperSchema = z.object({
  currentStep: z.number(),
  steps: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      done: z.boolean(),
      index: z.number(),
      path: z.string(),
    }),
  ),
});

type StepperType = z.infer<typeof StepperSchema>;

// {
//   id: 'sign-up-stepper',
//   label: '회원가입',
//   done: false,
//   index: 2,
//   path: '/sign-up',
// },
// {
//   id: 'sign-up-user-stepper',
//   label: '사용자 이름 설정',
//   done: false,
//   index: 3,
//   path: '/sign-up/register-user',
// },
export const STEPPERS_MAP: StepperType['steps'] = [
  { id: 'root-stepper', label: '시작', done: false, index: 0, path: '/' },
  { id: 'intro-stepper', label: '소개', done: false, index: 1, path: '/intro' },
  {
    id: 'login-stepper',
    label: '로그인',
    done: false,
    index: 2,
    path: '/login',
  },
  {
    id: 'login-email-stepper',
    label: 'Email 비밀번호 로그인',
    done: false,
    index: 3,
    path: '/login?method=email',
  },
  {
    id: 'login-pin-stepper',
    label: 'PIN 로그인',
    done: false,
    index: 4,
    path: '/login?method=pin',
  },
];

const INITIAL_STEP = {
  currentStep: 0,
  steps: STEPPERS_MAP,
};

export const stepperAtom = atomWithStorage<StepperType>('stepper', INITIAL_STEP, {
  getItem(key, initialValue) {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const item = window.sessionStorage.getItem(key);
    if (item === null) {
      return initialValue;
    }
    try {
      const parsedItem = StepperSchema.safeParse(JSON.parse(item));
      if (!parsedItem.success) {
        console.error(`Invalid data in sessionStorage for key "${key}":`, parsedItem.error);
        return initialValue;
      }
      if (parsedItem.data.steps.length !== STEPPERS_MAP.length) {
        window.sessionStorage.setItem(key, JSON.stringify(INITIAL_STEP));
        return INITIAL_STEP;
      }
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing JSON from sessionStorage for key "${key}":`, error);
      return initialValue;
    }
  },
  setItem(key, value) {
    const parsedValue = StepperSchema.safeParse(value);
    if (!parsedValue.success) {
      throw TypeError(`Invalid value for stepperAtom: ${parsedValue.error.message}`);
    }
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(key, JSON.stringify(parsedValue.data));
      } catch (error) {
        console.error(`Error setting item in sessionStorage for key "${key}":`, error);
      }
    }
  },
  removeItem(key) {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing item from sessionStorage for key "${key}":`, error);
      }
    }
  },
  subscribe(key, callback, initialValue) {
    if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
      return () => {};
    }
    const handler = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage && e.key === key) {
        let newValue;
        try {
          newValue = StepperSchema.parse(JSON.parse(e.newValue ?? ''));
        } catch {
          newValue = initialValue;
        }
        callback(newValue);
      }
    };

    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('storage', handler);
    };
  },
});
