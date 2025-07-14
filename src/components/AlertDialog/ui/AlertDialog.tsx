'use client';

import { createContext, useCallback, useMemo, useState } from 'react';

export const AlertDialogContext = createContext({
  open: false,
  onOpenToggle: () => {},
  contentId: 'alert-dialog-content',
});

export function AlertDialog({ defaultOpen = false, children }: { defaultOpen: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);

  const onOpenToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({
      open,
      onOpenToggle,
      contentId: 'alert-dialog-content',
    }),
    [open, onOpenToggle]
  );

  return <AlertDialogContext.Provider value={contextValue}>{children}</AlertDialogContext.Provider>;
}
