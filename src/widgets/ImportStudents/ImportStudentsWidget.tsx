// ImportStudentsWidget
import { FormContent } from '@src/widgets/ImportStudents/FormContent';
import { ConfirmDialog, Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import React, { FC, useState } from 'react';
import './model/init';
import { $fileImportStudents, importStudents, resetDomain, uploadStudents } from '@src/widgets/ImportStudents/model';
import { useStore } from 'effector-react';

type ImportStudentsWidgetType = {
  title: string;
  onClose: () => void;
  onSuccess: () => void;
};
export const ImportStudentsWidget: FC<ImportStudentsWidgetType> = ({ title, onClose, onSuccess }) => {
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const file = useStore($fileImportStudents);
  const uploadStudentsStatus = useStore(uploadStudents.$status);
  const importStudentsStatus = useStore(importStudents.$status);
  const onConfirm = () => {
    onClose();
    setIsOpenModalConfirm(false);
    resetDomain();
  };

  const closeModalConfirm = () => {
    setIsOpenModalConfirm(false);
  };

  const openModalConfirm = () => {
    if (file) {
      setIsOpenModalConfirm(true);
    } else {
      onConfirm();
    }
  };

  return (
    <>
      <ConfirmDialog
        onConfirm={onConfirm}
        isOpen={isOpenModalConfirm}
        onCancel={closeModalConfirm}
        dialogContent={{
          title: 'Подтверждение действия',
          confirmLabel: 'Покинуть',
          cancelLabel: 'Остаться',
          description:
            'Файл, который вы загрузили для импорта обучающихся, не будет сохранён. Вы уверены, что хотите покинуть страницу?',
        }}
      />
      <Drawer
        containerClassname="max-w-[900px]"
        onClose={openModalConfirm}
        isOpen
        lockScroll
        backDropProps={{
          isClickable: true,
          isDisabled: false,
          isTransparent: false,
        }}
      >
        <Drawer.Header title={title} onClose={openModalConfirm} />
        <Drawer.Content>
          <LoadingWrapper
            loadingStatusList={[uploadStudentsStatus, importStudentsStatus]}
            errorStatusList={[uploadStudentsStatus, importStudentsStatus]}
          >
            <FormContent onSuccess={onSuccess} />
          </LoadingWrapper>
        </Drawer.Content>
      </Drawer>
    </>
  );
};
