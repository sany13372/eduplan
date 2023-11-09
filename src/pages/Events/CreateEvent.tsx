import React, { useEffect, useMemo } from 'react';
import {
  EventParicipantsForm,
  FullnameFilter,
  Stepper,
  TabState,
  TabType,
  AddEventInfo,
} from '@src/pages/Events/components';
import { useBackgroundClassName, useSearchParam } from '@utils/hooks';
import {
  setEvent,
  eventFormatStore,
  eventKindStore,
  resetDomainData,
  setEventParticipants,
  eventVideoConfKindsStore,
} from '@src/pages/Events/model';
import { resetMfeBackGround, resetNavigationInfo, setMfeBackGround, setNavigationInfo } from '@src/app/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { Redirect, useHistory } from 'react-router-dom';
import { LoadingWrapper, useAuth, Portal, PageTitleContainer } from '@sber-universe/om-component-library';
import { PORTAL_ID } from '@constants/portal';
import { Typography } from '@kit-edu/typography';

export const CreateEvent = () => {
  const backgroundColor = useBackgroundClassName();

  const history = useHistory();
  const ownerId = useSearchParam('owner');
  const getEventKindListStatus = useStore(eventKindStore.$status);
  const getEventFormatListStatus = useStore(eventFormatStore.$status);
  const createdEventId = useStore(setEvent.$createdId);
  const setParticipantsStatus = useStore(setEventParticipants.$status);
  const statusList = [getEventKindListStatus, getEventFormatListStatus];
  const { personRole } = useAuth();

  useEffect(() => {
    eventKindStore.get();
    eventFormatStore.get();
    eventVideoConfKindsStore.get();
    return () => {
      resetDomainData();
      resetNavigationInfo();
      resetMfeBackGround();
    };
  }, []);

  useEffect(() => {
    if (ownerId)
      setNavigationInfo({
        to: getPath(MfeRoutes.EDU_PLAN_EVENTS, { ':planId': ownerId }),
        label: 'К списку событий',
      });
  }, [ownerId]);

  useEffect(() => {
    if (setParticipantsStatus === 'done' && createdEventId)
      history.push(getPath(MfeRoutes.EVENT_VIEW, { ':eventId': createdEventId }));
  }, [setParticipantsStatus, createdEventId, history]);

  const currentTab = useMemo<TabType>(() => (createdEventId ? 'participantList' : 'info'), [createdEventId]);
  const infoStatus = useMemo<TabState>(() => (createdEventId ? 'completed' : 'incompleted'), [createdEventId]);
  const participantStatus = useMemo<TabState>(() => 'incompleted', []);

  useEffect(() => {
    if (currentTab === 'participantList') setMfeBackGround('gray');
  }, [currentTab]);

  if (!ownerId) return <Redirect to="/" />;

  return (
    <>
      <Portal portalId={PORTAL_ID}>
        <PageTitleContainer>
          <Typography fontWeight="semibold" size="32px" color="white">
            Добавление события
          </Typography>
        </PageTitleContainer>
      </Portal>
      <LoadingWrapper errorStatusList={statusList} loadingStatusList={statusList}>
        <div className="space-y-[50px]">
          <div className={`sticky-top flex justify-between space-x-4 items-center z-20 ${backgroundColor}`}>
            <Stepper currentTab={currentTab} infoStatus={infoStatus} participantStatus={participantStatus} />
            {infoStatus === 'completed' && <FullnameFilter />}
          </div>
          {infoStatus === 'incompleted' && <AddEventInfo ownerId={ownerId} authorId={personRole ?? ''} />}
          {infoStatus === 'completed' && (
            <EventParicipantsForm id={createdEventId} ownerId={ownerId} authorId={personRole ?? ''} />
          )}
        </div>
      </LoadingWrapper>
    </>
  );
};
