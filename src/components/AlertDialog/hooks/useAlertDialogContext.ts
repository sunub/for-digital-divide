import { useContext } from 'react';
import { AlertDialogContext } from '../ui/AlertDialog';

export function useAlertDialogContext() {
  return useContext(AlertDialogContext);
}
