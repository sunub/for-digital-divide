'use client';

import React from 'react';

type InputStatus = {
  insert: boolean;
  confirm: boolean;
};

export const FocusContext = React.createContext<ContextValueSetting | any>(
  null,
);

export default function FocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextValue, setContextValue] = React.useState<ContextValue>({
    focusing: {
      insert: false,
      confirm: false,
    },
    length: 0,
    inputResult: {
      insert: {
        uid: '',
        coords: [],
      },
      confirm: {
        uid: '',
        coords: [],
      },
    },
  });

  return (
    <FocusContext.Provider
      value={{ data: contextValue, setter: setContextValue }}
    >
      {children}
    </FocusContext.Provider>
  );
}
