import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getPath, MfeRoutes, SettingsParams } from '@constants/routes';
import { resetDomain, saveSettings, saveSettingsInitialData } from '@src/pages/Lessons/model';
import { useStore } from 'effector-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { ErrorMessage } from '@src/components';
import { SettingsForm, SettingsFormContent } from '@src/pages/Lessons/components';
import { LoadingWrapper } from '@sber-universe/om-component-library';

import './model/init';

export const LessonSettings = (): JSX.Element => {
  const { lessonId } = useParams<SettingsParams>();
  const history = useHistory();

  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const settingId = searchParams.get('settingId');

  const { add, $validationErrors, $createdId, resetErrors, $status } = saveSettings;
  const createEffectStatus = useStore($status);

  useEffect(() => resetDomain, []);

  useEffect(() => {
    saveSettingsInitialData.get({ lessonId, settingId });
  }, [lessonId, settingId]);

  const initDataStatus = useStore(saveSettingsInitialData.$status);
  const initData = useStore(saveSettingsInitialData.$value);
  const prevPath: string = useMemo(
    () =>
      initData
        ? getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO, {
            ':planId': initData.eduPlanId,
            ':activityId': initData.eduPlanRowId,
          })
        : '',
    [initData],
  );

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  const onSuccess = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К карточке мероприятия', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      {!initData && <ErrorMessage />}
      {initData && (
        <SettingsForm
          onSuccess={onSuccess}
          initData={initData}
          onSubmit={add}
          errorStore={$validationErrors}
          resetErrorStore={resetErrors}
          savedItemIdStore={$createdId}
          title="Настройка дат занятия"
        >
          <SettingsFormContent onReset={goBack} isSubmitted={createEffectStatus === 'pending'} />
        </SettingsForm>
      )}
    </LoadingWrapper>
  );
};
