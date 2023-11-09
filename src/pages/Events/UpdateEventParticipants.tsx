import React, { useEffect, useState } from 'react';
import { resetDomainData, initParticipantDataStore, eventParticipantStore, eventInfo } from '@src/pages/Events/model';
import { resetMfeBackGround, resetNavigationInfo, setMfeBackGround, setNavigationInfo } from '@src/app/model';
import { EventParams, getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { Stepper, UpdateParticipantListForm } from '@src/pages/Events/components';
import { Button } from '@kit-edu/button';
import { useBackgroundClassName } from '@utils/hooks';
import { LoadingWrapper, PageTitleContainer, Portal } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { PORTAL_ID } from '@constants/portal';

export const UpdateEventParticipants = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const { eventId } = useParams<EventParams>();

  const backgroundColor = useBackgroundClassName();

  const info = useStore(eventInfo.$value);
  const infoStatus = useStore(eventInfo.$status);
  const eventParticipantsStatus = useStore(eventParticipantStore.$status);
  const eventParticipants = useStore(eventParticipantStore.$value);
  const initParticipantsStatus = useStore(initParticipantDataStore.$status);
  const initParticipants = useStore(initParticipantDataStore.$value);
  const statusList = [infoStatus, eventParticipantsStatus, initParticipantsStatus];

  const toggleDrawerState = () => {
    setDrawerIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setMfeBackGround('gray');
    setNavigationInfo({
      to: getPath(MfeRoutes.EVENT_VIEW, { ':eventId': eventId }, { tab: 'participant' }),
      label: 'К карточке события',
    });
    eventInfo.get(eventId);
    eventParticipantStore.get(eventId);
    return () => {
      resetDomainData();
      resetNavigationInfo();
      resetMfeBackGround();
    };
  }, [eventId]);

  useEffect(() => {
    if (info && eventId) initParticipantDataStore.get({ eventId, ownerId: info.ownerId });
  }, [eventId, info]);

  return (
    <>
      <Portal portalId={PORTAL_ID}>
        <PageTitleContainer>
          <Typography fontWeight="semibold" size="32px" color="white">
            Редактирование события
          </Typography>
        </PageTitleContainer>
      </Portal>

      <LoadingWrapper errorStatusList={statusList} loadingStatusList={statusList} errorInfoProps={{ variant: 'dark' }}>
        <div
          className={`  sticky py-2 top-0 left-0 z-20 flex justify-between space-x-4  items-center  mb-[50px] ${backgroundColor}`}
        >
          <Stepper currentTab="participantList" infoStatus="completed" participantStatus="completed" />
          <Button
            disabled={!initParticipants || initParticipants.length === 0}
            appearance="black"
            onClick={toggleDrawerState}
            iconRightName="master-plus"
            size="large"
          >
            Пригласить
          </Button>
        </div>
        <div>
          <UpdateParticipantListForm
            initData={{ participants: eventParticipants ?? [], id: eventId }}
            drawerProps={{ isOpen: drawerIsOpen, onReset: toggleDrawerState, authorId: info?.authorId ?? '' }}
          />
        </div>
      </LoadingWrapper>
    </>
  );
};
