import EventEmmiter from 'eventemitter3';
import type { ToastContent } from 'react-toastify';

import { TOAST_TYPES, Options } from './types';

const emitter = new EventEmmiter();

function createEmitter(type: TOAST_TYPES) {
  return (...args: [ToastContent, Options?]) => emitter.emit(type, ...args);
}

class ToastEmitter {
  success = createEmitter(TOAST_TYPES.SUCCESS);

  error = createEmitter(TOAST_TYPES.ERROR);

  warning = createEmitter(TOAST_TYPES.WARNING);

  info = createEmitter(TOAST_TYPES.INFO);

  confirm = createEmitter(TOAST_TYPES.CONFIRM);
}

const toastEmitter = new ToastEmitter();

export const EE = emitter;
export default toastEmitter;
