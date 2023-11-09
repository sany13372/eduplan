/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollArrow } from '@src/components';
import { Button } from '@kit-edu/button';
import { eventInfo, eventParticipantStore, resetDomainData } from '@src/pages/Events/model';
import { useHistory, useParams } from 'react-router-dom';
import { EventParams, getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { EmptyParticipantList, FullEventInfo, Tabs, TabType } from '@src/pages/Events/components';
import { ViewParticipantCard } from '@src/pages/Events/components/ParticipantInfoCard';
import { useSearchParam } from '@utils/hooks';
import { useSortParticipants } from '@src/pages/Events/model/hooks';
import { Participant } from '@src/pages/Events/model/types';
import { LoadingWrapper } from '@sber-universe/om-component-library';

type ParticipantListProps = {
  data: Participant[];
};
const ParticipantList = ({ data }: ParticipantListProps) => {
  return (
    <>
      {data.length === 0 && <EmptyParticipantList buttonName="Редактировать" />}
      {data.length > 0 && (
        <ScrollArrow isDisabled={false}>
          <div className="space-y-2" data-testid="eventParticipantBlock">
            {data.map((e) => (
              <ViewParticipantCard data={e} key={e.id} />
            ))}
          </div>
        </ScrollArrow>
      )}
    </>
  );
};

export type ViewEventDefaultProps = {
  onTabChange: (val: TabType) => void;
  onInfoUpdate: (data: { ownerId: string; title: string }) => void;
  background: string;
  isOnlyView: boolean;
};
export const ViewEventDefault = ({ onTabChange, onInfoUpdate, background, isOnlyView }: ViewEventDefaultProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>('info');
  const params = useSearchParam('tab');
  const { eventId } = useParams<EventParams>();
  const history = useHistory();
  const infoStatus = useStore(eventInfo.$status);
  const info = useStore(eventInfo.$value);
  const participantListStatus = useStore(eventParticipantStore.$status);
  const participantList = useStore(eventParticipantStore.$value);
  const statusList = [infoStatus, participantListStatus];

  const onSelectedTabChange = (val: TabType) => {
    onTabChange(val);
    setSelectedTab(val);
  };

  useEffect(() => resetDomainData, []);

  const updatePath = useMemo(() => {
    const url = selectedTab === 'info' ? MfeRoutes.EVENT_UPDATE_INFO : MfeRoutes.EVENT_UPDATE_PARTICIPANTS;
    return getPath(url, { ':eventId': eventId });
  }, [eventId, selectedTab]);

  const updateClickHandler = () => history.push(updatePath);

  const sortedData = useSortParticipants(participantList ?? []);

  useEffect(() => {
    if (params && params === 'participant') onSelectedTabChange('participantList');
  }, [params]);

  useEffect(() => {
    eventInfo.get(eventId);
    eventParticipantStore.get(eventId);
  }, [eventId]);

  useEffect(() => {
    if (info?.title && info?.ownerId) {
      const { ownerId, title } = info;
      onInfoUpdate({ ownerId, title });
    }
  }, [info]);

  return (
    <LoadingWrapper
      errorStatusList={statusList}
      loadingStatusList={statusList}
      errorInfoProps={{ variant: background === 'gray' ? 'dark' : 'light' }}
    >
      <div className="pb-[40px]">
        <div
          className={` sticky py-2 md:py-8 top-0 left-0 z-20 flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0 md:space-x-[64px] mb-[18px] md:items-center ${background}`}
        >
          <Tabs value={selectedTab} onTabChange={onSelectedTabChange} />
          {!isOnlyView && (
            <Button
              appearance="black"
              size="large"
              iconRightName="master-edit"
              onClick={updateClickHandler}
              disabled={!info || (info.isPublished && selectedTab === 'info')}
            >
              Редактировать
            </Button>
          )}
        </div>
        {info && selectedTab === 'info' && <FullEventInfo item={info} />}
        {selectedTab === 'participantList' && <ParticipantList data={sortedData} />}
      </div>
    </LoadingWrapper>
  );
};
