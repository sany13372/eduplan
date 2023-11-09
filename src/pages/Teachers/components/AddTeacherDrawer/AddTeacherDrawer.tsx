import { useStore } from 'effector-react';
import {
  $addTeacherDrawerInfo,
  inviteTeacherList,
  resetAddTeacherDrawerInfo,
  resetInviteTeacherList,
  updateTeacherList,
} from '@src/pages/Teachers/model';
import { Drawer } from '@src/components';
import { Typography } from '@kit-edu/typography';
import React, { useEffect, useState } from 'react';
import { Button } from '@kit-edu/button';
import { Formik } from 'formik';
import { UpdateTeacherListData } from '@src/pages/Teachers/model/types';
import { useBackgroundClassName } from '@utils/hooks';
import { ConfirmDialog } from '@src/pages/Teachers/components/AddTeacherDrawer/ConfirmDialog';
import { openSuccessToast } from '@src/utils/helpers/toast';
import { defaultToastMessage } from '@src/pages/Teachers/model/constants';
import { LoadingWrapper } from '@sber-universe/om-component-library';

import { FormContent } from './FormContent';

export const AddTeacherDrawer = () => {
  const [requireConfirm, setRequireConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const data = useStore($addTeacherDrawerInfo);

  const getInviteTeacherListStatus = useStore(inviteTeacherList.$status);
  const updateTeacherListStatus = useStore(updateTeacherList.$status);

  const updateRequireConfirm = (val: boolean) => setRequireConfirm(val);

  const onCloseHandler = () => {
    resetAddTeacherDrawerInfo();
    resetInviteTeacherList();
  };

  const bgColor = useBackgroundClassName();
  useEffect(() => {
    if (updateTeacherListStatus === 'done') {
      openSuccessToast(defaultToastMessage);
      onCloseHandler();
    }
  }, [updateTeacherListStatus]);

  useEffect(() => {
    if (data) inviteTeacherList.get(data);
  }, [data]);

  const onClose = () => {
    if (!requireConfirm) onCloseHandler();
    else setIsOpen(true);
  };

  const onCloseWithConfirm = (val: boolean) => {
    if (val) onCloseHandler();
    setIsOpen(false);
  };

  return (
    <Drawer isOpen={Boolean(data)} onClose={onClose} containerClassname="bg-base-200">
      <ConfirmDialog isVisible={isOpen} actionHandler={onCloseWithConfirm} />
      <div className=" px-[34px] h-full w-full overflow-auto" data-testid="addingTeachersWidget">
        <div className={`sticky top-0 left-0 z-20  pt-6 pb-[18px] flex flex-col gap-[26px] ${bgColor}`}>
          <div className="flex justify-between items-center space-x-4">
            <Typography as="h3" fontWeight="semibold" size="24px" lineHeight="high">
              Выбор преподавателей
            </Typography>
            <Button
              onClick={onClose}
              size="medium"
              appearance="dark-outline"
              className="w-10 h-10"
              shape="circular"
              iconLeftName="master-math-multiplication"
            />
          </div>
        </div>
        <LoadingWrapper loadingStatusList={[getInviteTeacherListStatus]} errorStatusList={[getInviteTeacherListStatus]}>
          <Formik<UpdateTeacherListData>
            onSubmit={updateTeacherList.update}
            initialValues={{
              path: data,
              teacherList: [],
            }}
          >
            <FormContent onFormUpdate={updateRequireConfirm} resetClickHandler={onClose} />
          </Formik>
        </LoadingWrapper>
      </div>
    </Drawer>
  );
};
