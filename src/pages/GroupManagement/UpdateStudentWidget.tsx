import {
  StudentInfoForm,
  useGetStudentFormDictionaries,
  useStudentFormDictionaries,
} from '@src/pages/GroupManagement/components';
import { StudentFormProps } from '@src/pages/GroupManagement/components/StudentInfoForm/StudentInfoForm';
import { StudentInfo } from '@src/pages/GroupManagement/components/StudentInfoForm/types';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { studentInfo, updateStudentInfo } from '@src/pages/GroupManagement/model';
import { FC, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { StudentInfoInitialData } from '@src/pages/GroupManagement/model/types';

const useModifyInitialData = (initialData: StudentInfoInitialData | null) => {
  const { financingSources, courses, groups, loadingStatus } = useStudentFormDictionaries();
  if (!initialData)
    return {
      data: null,
      loadingStatus,
    };

  const data = {
    ...initialData,
    groups,
    group: groups.find(({ id }) => id === initialData.group?.id),
    financingSource: financingSources.find(({ id }) => id === initialData.financingSource?.id),
    course: courses.find(({ id }) => id === initialData.course?.id),
  };

  return {
    data,
    loadingStatus,
  };
};

type UpdateStudentWidgetType = {
  studentId: string;
  modalApi: {
    close: () => void;
  };
  title?: string;
  disabledFields?: StudentFormProps<StudentInfo>['disabledFields'];
  onSuccess?: () => void;
};

export const UpdateStudentWidget: FC<UpdateStudentWidgetType> = ({
  studentId,
  title = 'Редактирование данных обучающегося',
  modalApi,
  disabledFields,
  onSuccess,
}) => {
  const { planId } = useParams<{ planId: string; groupId: string }>();
  const initData = useStore(studentInfo.$value);
  const { update, $validationErrors, $updatedId, resetErrors } = updateStudentInfo;
  const { data, loadingStatus } = useModifyInitialData(initData);
  const isGroupDisabled = Boolean(data?.groups.length === 0);

  useGetStudentFormDictionaries(planId);
  useEffect(() => {
    studentInfo.get(studentId as string);
  }, [planId, studentId]);

  if (!data) return null;

  return (
    <LoadingWrapper loadingStatusList={[loadingStatus]} errorStatusList={[loadingStatus]}>
      <StudentInfoForm
        onReset={modalApi.close}
        onSubmit={update}
        onSuccess={() => {
          modalApi.close();
          onSuccess?.();
        }}
        initData={data}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$updatedId}
        title={title}
        modalApi={modalApi}
        disabledFields={{ ...disabledFields, group: isGroupDisabled }}
      />
    </LoadingWrapper>
  );
};
