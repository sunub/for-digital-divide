"use client";

import { z } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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

export type StepperType = z.infer<typeof StepperSchema>;

export const STEPPERS_MAP: StepperType["steps"] = [
  { id: "root-stepper", label: "시작", done: false, index: 0, path: "/" },
  { id: "intro-stepper", label: "소개", done: false, index: 1, path: "/intro" },
  {
    id: "login-stepper",
    label: "로그인",
    done: false,
    index: 2,
    path: "/onboarding",
  },
  {
    id: "login-email-stepper",
    label: "Email 비밀번호 로그인",
    done: false,
    index: 3,
    path: "/onboarding?step=email-input",
  },
  {
    id: "login-pin-stepper",
    label: "PIN 로그인",
    done: false,
    index: 4,
    path: "/onboarding?step=pin-input",
  },
];

const INITIAL_STEP = {
  currentStep: 0,
  steps: STEPPERS_MAP,
};

interface StepperStoreActions {
  setStepper: (
    stepper: StepperType | ((prev: StepperType) => StepperType),
  ) => void;
}

const customStorage = {
  getItem: (key: string) => {
    if (typeof window === "undefined") {
      return JSON.stringify({ state: INITIAL_STEP });
    }
    const item = window.sessionStorage.getItem(key);
    if (item === null) {
      return JSON.stringify({ state: INITIAL_STEP });
    }
    try {
      const parsedItem = StepperSchema.safeParse(JSON.parse(item));
      if (!parsedItem.success) {
        console.error(
          `Invalid data in sessionStorage for key "${key}":`,
          parsedItem.error,
        );
        return JSON.stringify({ state: INITIAL_STEP });
      }
      if (parsedItem.data.steps.length !== STEPPERS_MAP.length) {
        window.sessionStorage.setItem(key, JSON.stringify(INITIAL_STEP));
        return JSON.stringify({ state: INITIAL_STEP });
      }
      return JSON.stringify({ state: parsedItem.data });
    } catch (error) {
      console.error(
        `Error parsing JSON from sessionStorage for key "${key}":`,
        error,
      );
      return JSON.stringify({ state: INITIAL_STEP });
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      const parsed = JSON.parse(value);
      const parsedValue = StepperSchema.safeParse(parsed.state);
      if (!parsedValue.success) {
        throw TypeError(
          `Invalid value for stepperAtom: ${parsedValue.error.message}`,
        );
      }
      window.sessionStorage.setItem(key, JSON.stringify(parsedValue.data));
    } catch (error) {
      console.error(
        `Error setting item in sessionStorage for key "${key}":`,
        error,
      );
    }
  },
  removeItem: (key: string) => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing item from sessionStorage for key "${key}":`,
        error,
      );
    }
  },
};

export const useStepperStore = create<StepperType & StepperStoreActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_STEP,
      setStepper: (stepper) => {
        if (typeof stepper === "function") {
          const prev = {
            currentStep: get().currentStep,
            steps: get().steps,
          };
          set(stepper(prev));
        } else {
          set(stepper);
        }
      },
    }),
    {
      name: "stepper",
      storage: createJSONStorage(() => customStorage),
    },
  ),
);

if (
  typeof window !== "undefined" &&
  typeof window.addEventListener === "function"
) {
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.storageArea === sessionStorage && e.key === "stepper") {
      let newValue: StepperType;
      try {
        newValue = StepperSchema.parse(JSON.parse(e.newValue ?? ""));
      } catch {
        newValue = INITIAL_STEP;
      }
      useStepperStore.setState(newValue);
    }
  });
}
