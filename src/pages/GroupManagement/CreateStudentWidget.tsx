import { StudentInfoForm, useGetStudentFormDictionaries } from '@src/pages/GroupManagement/components';
import { StudentFormProps } from '@src/pages/GroupManagement/components/StudentInfoForm/StudentInfoForm';
import { StudentInfo } from '@src/pages/GroupManagement/components/StudentInfoForm/types';
import { useParams } from 'react-router-dom';
import { createStudentInfo, createStudentInfoInitialData, groupsStore } from '@src/pages/GroupManagement/model';
import { useStore } from 'effector-react';
import { FC, useEffect, useMemo } from 'react';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { StudentInfoInitialData } from '@src/pages/GroupManagement/model/types';

interface CreateStudentWidgetProps {
  modalApi: {
    close: () => void;
  };
  groupId?: string;
  title?: string;
  disabledFields?: StudentFormProps<StudentInfo>['disabledFields'];
  onSuccess?: () => void;
}

export const CreateStudentWidget: FC<CreateStudentWidgetProps> = ({
  groupId,
  title = 'Добавление обучающегося',
  modalApi,
  disabledFields,
  onSuccess,
}) => {
  const { planId } = useParams<{ planId: string }>();
  const { add, $validationErrors, $createdId, resetErrors } = createStudentInfo;
  const groups = useStore(groupsStore.$items);
  const createStudentData = useStore(createStudentInfoInitialData.$value);
  const loadingStatus = useStore(createStudentInfoInitialData.$status);
  const statusList = useGetStudentFormDictionaries(planId);
  const fullStatusList = [...statusList, loadingStatus];
  const formIsReady = !!statusList.filter((e) => e !== 'done').length;
  const groupInfo = groups.find((e) => e.id === groupId);
  useEffect(() => {
    createStudentInfoInitialData.get({
      planId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId, formIsReady]);

  const formInitData: StudentInfoInitialData | null = useMemo(() => {
    if (!createStudentData) return null;
    return { ...createStudentData, group: groupInfo };
  }, [createStudentData, groupInfo]);

  if (!formInitData) return null;
  return (
    <LoadingWrapper loadingStatusList={fullStatusList} errorStatusList={fullStatusList}>
      <StudentInfoForm
        onReset={modalApi.close}
        onSubmit={add}
        onSuccess={() => {
          modalApi.close();
          onSuccess?.();
        }}
        initData={formInitData}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$createdId}
        title={title}
        modalApi={modalApi}
        disabledFields={disabledFields}
      />
    </LoadingWrapper>
  );
};
