import { ErrorDialog } from '@sber-universe/om-component-library';
import {
  $isNotPossibleCreateStudentModal,
  setIsNotPossibleCreateStudentModal,
} from '@src/pages/StudentGroupList/model';
import { useStore } from 'effector-react';

export const NotPossibleCreateStudentErrorDialog = () => {
  const isOpen = useStore($isNotPossibleCreateStudentModal);
  const onClose = () => {
    setIsNotPossibleCreateStudentModal(false);
  };

  return (
    <ErrorDialog
      isOpen={isOpen}
      onClose={onClose}
      dialogContent={{
        title: 'Ошибка',
        description:
          'В образовательном пространстве нет поставщиков с ролью «Обучающийся». Добавление обучающегося невозможно',
        closeLabel: 'ОК',
      }}
    />
  );
};
