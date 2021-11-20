import React, { memo, useMemo, useCallback } from 'react';
import Modal from '../Modal';
import Button from '../Button';
import type { Props as ModalProps } from '../Modal/Modal';

import styles from './ConfirmationModal.module.scss';

export enum ConfirmationModalType {
  Deletion = 1,
  Warning,
  Addition,
}

export interface Props extends ModalProps {
  type: ConfirmationModalType;
  cancelText?: string;
  acceptText?: string;
  title: string;
  onAccept(event: React.MouseEvent | React.KeyboardEvent): void;
}

const ConfirmationModal: React.FunctionComponent<Props> = ({
  title,
  type,
  children,
  cancelText,
  acceptText,
  onRequestClose,
  onAccept,
  ...props
}) => {
  const buttonColor = useMemo(() => {
    switch (type) {
      case ConfirmationModalType.Deletion:
        return 'red';
      case ConfirmationModalType.Warning:
        return 'orange';
      default:
        return 'blue';
    }
  }, [type]);

  const handleClose = useCallback(
    e => {
      if (onRequestClose) {
        onRequestClose(e);
      }
    },
    [onRequestClose]
  );

  return (
    <Modal onRequestClose={onRequestClose} {...props}>
      <Modal.Header>
        <Modal.Title className={styles.confirmationModalTitle}>{title}</Modal.Title>
        <Modal.Content className={styles.confirmationModalContent}>{children}</Modal.Content>
      </Modal.Header>
      <Modal.Footer className={styles.confirmationModalButtons}>
        <Button outlined color="gray" onClick={handleClose}>
          {cancelText ?? 'Cancel'}
        </Button>
        <Button color={buttonColor} onClick={onAccept}>
          {acceptText ?? 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Object.assign(memo(ConfirmationModal), { displayName: 'ConfirmationModal' });
