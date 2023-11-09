import React, { useEffect } from 'react';
import { setEvent, initDataStore, resetDomainData } from '@src/pages/Events/model';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { EventParams, getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { useHistory, useParams } from 'react-router-dom';
import { Stepper, SetEventInfoForm } from '@src/pages/Events/components';
import { openSuccessToast } from '@utils/helpers/toast';
import { SetEventInfo } from '@src/pages/Events/model/types';
import { LoadingWrapper, PageTitleContainer, Portal } from '@sber-universe/om-component-library';
import { PORTAL_ID } from '@constants/portal';
import { Typography } from '@kit-edu/typography';

export const UpdateEventInfo = () => {
  const history = useHistory();
  const updatedEventId = useStore(setEvent.$createdId);
  const updateEventStatus = useStore(setEvent.$status);
  const { eventId } = useParams<EventParams>();
  const getInitDataStatus = useStore(initDataStore.$status);
  const initData = useStore(initDataStore.$value);

  const submitHandler = (values: SetEventInfo) => {
    setEvent.add(values);
  };

  const resetHandler = () => {
    history.push(getPath(MfeRoutes.EVENT_VIEW, { ':eventId': eventId }));
  };

  useEffect(() => {
    return () => {
      resetDomainData();
      resetNavigationInfo();
    };
  }, []);

  useEffect(() => {
    if (updatedEventId) {
      openSuccessToast('Данные события успешно обновлены');
      history.push(getPath(MfeRoutes.EVENT_VIEW, { ':eventId': updatedEventId }));
    }
  }, [updatedEventId, history]);

  useEffect(() => {
    initDataStore.get(eventId);
    setNavigationInfo({
      to: getPath(MfeRoutes.EVENT_VIEW, { ':eventId': eventId }),
      label: 'К карточке события',
    });
  }, [eventId]);

  return (
    <>
      <Portal portalId={PORTAL_ID}>
        <PageTitleContainer>
          <Typography fontWeight="semibold" size="32px" color="white">
            Редактирование события
          </Typography>
        </PageTitleContainer>
      </Portal>
      <LoadingWrapper errorStatusList={[getInitDataStatus]} loadingStatusList={[getInitDataStatus]}>
        <div className="flex justify-between space-x-4  items-center  mb-[50px]">
          <Stepper currentTab="info" infoStatus="completed" participantStatus="completed" />
        </div>
        {initData && (
          <SetEventInfoForm
            initData={initData}
            onReset={resetHandler}
            onSubmit={submitHandler}
            isLoading={updateEventStatus === 'pending'}
          />
        )}
      </LoadingWrapper>
    </>
  );
};
