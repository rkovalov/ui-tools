import type { ToastOptions } from 'react-toastify';

export enum TOAST_TYPES {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  CONFIRM = 'confirm',
}

export interface Options extends ToastOptions {
  onConfirm?: () => void;
  confirmText?: React.ReactNode;
}
