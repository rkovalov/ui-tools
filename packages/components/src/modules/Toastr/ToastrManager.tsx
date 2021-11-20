import { useEffect } from 'react';
import { ToastContainer, toast, ToastContent, ToastOptions, ToastContentProps } from 'react-toastify';
import { EE } from './toastr-emitter';
import { TOAST_TYPES, Options } from './types';
import 'react-toastify/dist/ReactToastify.css';

import styles from './ToastrManager.module.scss';

const { SUCCESS, ERROR, WARNING, INFO, CONFIRM } = TOAST_TYPES;

const createToast = (_: TOAST_TYPES, defaultProps: ToastOptions) => (content: ToastContent, props: ToastOptions) => {
  toast(content, { ...defaultProps, ...props });
};

const handlers = {
  [ERROR]: createToast(ERROR, { className: styles.error }),
  [SUCCESS]: createToast(SUCCESS, { className: styles.success }),
  [WARNING]: createToast(WARNING, { className: styles.warning }),
  [INFO]: createToast(INFO, { className: styles.info }),
  [CONFIRM]: (content: ToastContent, { onConfirm, confirmText, ...restProps }: Options = {}) =>
    toast(
      ({ closeToast }: ToastContentProps): React.ReactNode => {
        const _onConfirm = (): void => {
          closeToast?.();
          onConfirm?.();
        };
        return (
          <>
            <span className={styles.content}>{content}</span>
            {/*  eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span onClick={_onConfirm} className={styles.confirmText}>
              {confirmText}
            </span>
          </>
        );
      },
      { className: styles.confirm, autoClose: false, hideProgressBar: true, closeOnClick: false, ...restProps }
    ),
};

const useEmmiter = () => {
  useEffect(() => {
    EE.on(SUCCESS, handlers[SUCCESS]);
    EE.on(ERROR, handlers[ERROR]);
    EE.on(WARNING, handlers[WARNING]);
    EE.on(INFO, handlers[INFO]);
    EE.on(CONFIRM, handlers[CONFIRM]);

    return () => {
      EE.removeListener(SUCCESS, handlers[SUCCESS]);
      EE.removeListener(ERROR, handlers[ERROR]);
      EE.removeListener(WARNING, handlers[WARNING]);
      EE.removeListener(INFO, handlers[INFO]);
      EE.removeListener(CONFIRM, handlers[CONFIRM]);
    };
  });
};

const ToastrManager: React.FunctionComponent = () => {
  useEmmiter();
  return <ToastContainer className={styles.container} position="bottom-right" progressClassName={styles.progressBar} />;
};

export default ToastrManager;
