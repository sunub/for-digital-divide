'use client';

import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const STEPPERS_MAP = [
  { id: 'root-stepper', label: '시작', done: false, index: 0, path: '/' },
  { id: 'intro-stepper', label: '소개', done: false, index: 1, path: '/intro' },
  {
    id: 'sign-up-stepper',
    label: '회원가입',
    done: false,
    index: 2,
    path: '/sign-up',
  },
];

export const SIGN_UP_STEPS = [
  {
    id: 'sign-up-username-stepper',
    label: '사용자 이름 설정',
    done: false,
    index: 3,
    path: '/sign-up/username',
  },
  {
    id: 'sign-up-pin-stepper',
    label: 'PIN 설정',
    done: false,
    index: 4,
    path: '/sign-up/pin',
  },
];

const INITIAL_STEP = {
  currentStep: 0,
  steps: STEPPERS_MAP,
};

export const stepperAtom = atomWithStorage(
  'stepper',
  INITIAL_STEP,
  createJSONStorage(() => sessionStorage)
);
