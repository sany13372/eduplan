import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';

import './model/init';

import React, { useEffect } from 'react';
import { Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import { BaseInfo } from '@src/widgets/ChooseStudents/model/types';
import {
  chooseStudentsInitialInfo,
  closeConfirm,
  linkStudents,
  resetDomain,
  setBaseInfo,
} from '@src/widgets/ChooseStudents/model';
import { Formik } from 'formik';
import { useStore } from 'effector-react';
import { StudentInfo } from '@src/types';
import { useConfirmCallbackWrapped } from '@src/utils/hooks';
import { defaultStudentListInfo } from '@src/widgets/ChooseStudents/model/constants';
import { FormContent } from '@src/widgets/ChooseStudents/FormContent';

type ChooseStudentsWidgetProps = {
  title: string;
  data: BaseInfo;
  onClose: () => void;
  onSuccess: () => void;
};
export const ChooseStudentsWidget = ({ data, onClose, onSuccess, title }: ChooseStudentsWidgetProps) => {
  const linkStatus = useStore(linkStudents.$status);
  const initInfoStatus = useStore(chooseStudentsInitialInfo.$status);
  useEffect(() => {
    setBaseInfo(data);
  }, [data]);
  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: closeConfirm });
  const onSubmit = (values: { checkedStudents: StudentInfo[] }) => {
    linkStudents.add({ studentIds: values.checkedStudents.map((e) => e.id), groupId: data.groupId });
  };
  useEffect(() => {
    if (linkStatus === 'done') onSuccess();
  }, [linkStatus, onSuccess]);
  useEffect(() => {
    chooseStudentsInitialInfo.get({
      baseInfo: { groupId: data.groupId, planId: data.planId },
      filter: '',
      data: defaultStudentListInfo,
    });
    return resetDomain;
  }, [data.groupId, data.planId]);
  const portalId = 'addStudentToGroupPortal';
  return (
    <Drawer
      containerClassname="max-w-[900px]"
      onClose={onCloseWrapper}
      isOpen
      portalId={portalId}
      lockScroll
      backDropProps={{
        isClickable: true,
        isDisabled: false,
        isTransparent: false,
      }}
    >
      <Drawer.Header title={title} onClose={onClose} />
      <Drawer.Content>
        {/* <FioFilter /> */}
        <LoadingWrapper loadingStatusList={[initInfoStatus]} errorStatusList={[initInfoStatus]}>
          <Formik<{ checkedStudents: StudentInfo[] }> initialValues={{ checkedStudents: [] }} onSubmit={onSubmit}>
            <FormContent portalId={portalId} onClose={onCloseWrapper} />
          </Formik>
        </LoadingWrapper>
      </Drawer.Content>
    </Drawer>
  );
};
