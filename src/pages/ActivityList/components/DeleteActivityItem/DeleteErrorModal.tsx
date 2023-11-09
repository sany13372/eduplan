import React, { FC } from 'react';
import { ErrorDialog } from '@sber-universe/om-component-library';

export interface DeleteErrorModalProps {
  errorMessage: string;
  close: () => void;
}

export const DeleteErrorModal: FC<DeleteErrorModalProps> = ({ errorMessage, close }) => {
  const isOpen = !!errorMessage;

  return (
    <>
      <ErrorDialog
        isOpen={isOpen}
        onClose={close}
        portalId="delete-user-link-error-portal"
        dialogContent={{ description: errorMessage }}
      />
    </>
  );
};
