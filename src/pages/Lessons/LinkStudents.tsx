import { useStore } from 'effector-react';
import { $selectedImpls, eduPlanRowData, resetDomain, updateLinkedStudentsInitialData } from '@src/pages/Lessons/model';
import { Typography } from '@kit-edu/typography';
import { useEffect, useMemo } from 'react';
import { setNavigationInfo } from '@src/app/model';
import { getPath, MfeRoutes, ThemeParams } from '@constants/routes';
import { SelectedStudents } from '@src/pages/Lessons/model/types';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useMfeBackGround } from '@utils/hooks';

import { StudentsForm } from './components';

export const LinkStudents = (): JSX.Element => {
  const history = useHistory();
  const { themeId, implId } = useParams<ThemeParams>();
  const linkedStudents = useStore(updateLinkedStudentsInitialData.$value);
  const getLinkedStudentsStatus = useStore(updateLinkedStudentsInitialData.$status);
  const impls = useStore($selectedImpls);
  const selectedImpls = useMemo(
    () => (Array.isArray(impls[themeId]) ? impls[themeId] : [implId]),
    [implId, impls, themeId],
  );

  const initData: SelectedStudents = useMemo(
    () => ({
      idList: linkedStudents,
      activityRowId: themeId,
      implIdList: selectedImpls,
    }),
    [selectedImpls, linkedStudents, themeId],
  );

  useEffect(() => {
    if (selectedImpls.length === 1) updateLinkedStudentsInitialData.get(selectedImpls[0]);
  }, [selectedImpls]);

  useEffect(() => {
    eduPlanRowData.get(themeId);
  }, [themeId]);

  const getEduPlanRowInfoStatus = useStore(eduPlanRowData.$status);
  const getEduPlanRowInfoValue = useStore(eduPlanRowData.$value);
  const statusList = useMemo(
    () => (selectedImpls.length === 1 ? [getEduPlanRowInfoStatus, getLinkedStudentsStatus] : [getEduPlanRowInfoStatus]),
    [getEduPlanRowInfoStatus, getLinkedStudentsStatus, selectedImpls.length],
  );
  useEffect(() => resetDomain, []);

  const prevPath = useMemo(() => {
    if (getEduPlanRowInfoValue) {
      return getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO, {
        ':planId': getEduPlanRowInfoValue.eduPlanId,
        ':activityId': getEduPlanRowInfoValue.id,
      });
    }
    return '';
  }, [getEduPlanRowInfoValue]);

  useEffect(() => {
    if (prevPath) setNavigationInfo({ label: 'К карточке мероприятия', to: prevPath });
  }, [prevPath]);

  const onSuccess = () => {
    if (prevPath) history.push(prevPath);
  };

  const onReset = () => {
    if (prevPath) history.push(prevPath);
  };

  useMfeBackGround('gray');
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        Запись обучающихся на занятие
      </Typography>
      <LoadingWrapper errorStatusList={statusList} loadingStatusList={statusList}>
        <StudentsForm onSuccess={onSuccess} initData={initData} onReset={onReset} />
      </LoadingWrapper>
    </div>
  );
};
