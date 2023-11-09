import React, { useEffect, useMemo } from 'react';
import { EmptyList } from '@src/pages/Events/components';
import { useStore } from 'effector-react';
import { $filters, $getInitFiltersFxStatus, getInitFilters, resetDomainData } from '@src/pages/Events/model';
import { EventListContent } from '@src/pages/Events/EventListContent';
import { LoadingWrapper, useAuth } from '@sber-universe/om-component-library';
import './model/init';
import { useSearchParam } from '@utils/hooks';

type EventListDefaultProps = { eduplanId?: string; isOnlyView?: boolean };
export const EventListDefault = ({ eduplanId, isOnlyView }: EventListDefaultProps) => {
  const defaultTab = useSearchParam('tab') ?? '';
  const { tabs } = useStore($filters);
  const { personRole } = useAuth();
  const eventCount = useMemo(() => tabs.reduce((a, b) => a + b.count, 0), [tabs]);
  const getFiltersStatus = useStore($getInitFiltersFxStatus);
  useEffect(() => {
    getInitFilters({
      eduplanId,
      participantId: personRole && isOnlyView ? personRole : undefined,
      tab: defaultTab === 'completed' ? 'past' : 'current',
    });
  }, [defaultTab, eduplanId, isOnlyView, personRole]);

  useEffect(() => resetDomainData, []);

  const itemsNotFound = useMemo(() => eventCount === 0 && getFiltersStatus === 'done', [eventCount, getFiltersStatus]);
  return (
    <LoadingWrapper errorStatusList={[getFiltersStatus]} loadingStatusList={[getFiltersStatus]}>
      {itemsNotFound ? <EmptyList /> : <EventListContent />}
    </LoadingWrapper>
  );
};
