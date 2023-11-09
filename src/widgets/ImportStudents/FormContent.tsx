import { EduPlanParams } from '@src/types';
import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $fileImportStudents,
  importStudents,
  resetDomain,
  setFileImportStudents,
  uploadStudents,
} from '@src/widgets/ImportStudents/model';
import { addSuccessToast } from '@src/app/model';
import { ConfirmDialog, UploadFileButton } from '@sber-universe/om-component-library';
import { CardImportInformation } from '@src/widgets/ImportStudents/components';
import { Card, SolidNotification } from '@src/components';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';

type FormContentType = {
  onSuccess: () => void;
};
export const FormContent: FC<FormContentType> = ({ onSuccess }) => {
  const { planId: eduPlanId } = useParams<EduPlanParams>();
  const sessionId = useStore(uploadStudents.$value);
  const importUsers = useStore(importStudents.$value);
  const file = useStore($fileImportStudents);
  const isImportUsersEmpty = useMemo(() => importUsers?.createdCount === 0, [importUsers]);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState<boolean>(false);
  const isFileUpload = useMemo(() => file && !importUsers && sessionId, [importUsers, sessionId, file]);
  const [isValidFile, setIsValidFile] = useState<boolean>(true);
  const textNotification = useMemo(
    () =>
      isValidFile
        ? 'Заполните файл правильно. Скачайте шаблон выше и перенесите в него данные обучающихся'
        : 'Загрузите файл в формате CSV. Система принимает таблицы только в этом расширении',
    [isValidFile],
  );

  const closeModalConfirm = () => {
    setIsOpenModalConfirm(false);
  };

  const openModalConfirm = () => {
    setIsOpenModalConfirm(true);
  };

  const importStudentsHandler = () => {
    importStudents.get(sessionId);
  };

  const deletedFile = () => {
    setFileImportStudents(null);
    closeModalConfirm();
    uploadStudents.reset();
  };

  const successImportUsers = () => {
    deletedFile();
    onSuccess();
    addSuccessToast({
      message: `Успешно импортировано ${importUsers?.createdCount} обучающихся из ${importUsers?.totalCount}`,
    });
    resetDomain();
  };

  const uploadFile = (files: File[]) => {
    if (files.length > 0 && files[0].type === 'text/csv') {
      setIsValidFile(true);
      importStudents.reset();
      setFileImportStudents(files[0]);
      uploadStudents.get({ file: files[0], eduPlanId });
    } else {
      setIsValidFile(false);
    }
  };

  useEffect(() => {
    if (importUsers && isImportUsersEmpty) {
      deletedFile();
    }
    if (importUsers && importUsers.createdCount > 0) {
      successImportUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importUsers]);

  return (
    <>
      <ConfirmDialog
        onConfirm={deletedFile}
        isOpen={isOpenModalConfirm}
        onCancel={closeModalConfirm}
        dialogContent={{
          title: 'Подтверждение действия',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отмена',
          description: 'Вы действительно хотите удалить файл для импорта?',
        }}
      />
      <CardImportInformation />
      <Card className="p-8">
        <Typography as="h4" size="18px" fontWeight="semibold">
          Загрузка файла для импорта
        </Typography>
        <Typography as="p" size="14px" className="mb-6 mt-4">
          Вы можете загрузить одну таблицу с данными обучающихся. По формату и структуре таблица должна соответствовать
          требованиям выше
        </Typography>
        {isFileUpload && (
          <div
            className="bg-base-200 mb-6 flex rounded-md justify-between py-2 px-4 items-center"
            data-testid="uploadFile"
          >
            <Typography as="span" size="14px">
              {file?.name}
            </Typography>
            <Button
              onClick={openModalConfirm}
              iconLeftName="master-close"
              appearance="white"
              size="extra-small"
              shape="circular"
            />
          </div>
        )}
        {(!isValidFile || isImportUsersEmpty) && <SolidNotification template={textNotification} appearance="error" />}
        <div className="flex gap-4">
          <UploadFileButton
            label="Выбрать файл"
            buttonProps={{
              size: 'medium',
              appearance: 'black',
              disabled: Boolean(isFileUpload),
            }}
            uploaderProps={{
              multiple: false,
              accept: '.csv',
              onDropAccepted: uploadFile,
              onDropRejected: () => {
                setIsValidFile(false);
              },
            }}
          />
          <Button onClick={importStudentsHandler} appearance="black" size="medium" disabled={Boolean(!isFileUpload)}>
            Импортировать
          </Button>
        </div>
      </Card>
    </>
  );
};
