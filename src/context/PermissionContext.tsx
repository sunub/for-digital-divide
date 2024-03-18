'use client';

import React from 'react';

type PermissionContextType = {
  hasRequestedPermission: boolean;
  setHasRequestedPermission: (value: boolean) => void;
};

const initialPermissionContext: PermissionContextType = {
  hasRequestedPermission: false,
  setHasRequestedPermission: () => {},
};

export const PermissionContext = React.createContext(initialPermissionContext);

export const PermissionProvider = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [hasRequestedPermission, setHasRequestedPermission] =
      React.useState(false);

    return (
      <PermissionContext.Provider
        value={{ hasRequestedPermission, setHasRequestedPermission }}
      >
        {children}
      </PermissionContext.Provider>
    );
  },
);
