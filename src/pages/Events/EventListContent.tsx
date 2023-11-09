import React, { useMemo } from 'react';
import { Typography } from '@kit-edu/typography';
import {
  ActionPanel,
  DeleteEvent,
  EventInfoCard,
  UploadOnScroll,
  EmptyFilteredList,
} from '@src/pages/Events/components';
import { useStore } from 'effector-react';
import { $eventListInfo, $getEventListPageFxStatus, $filters } from '@src/pages/Events/model';
import { ScrollArrow } from '@src/components';
import { useMediaQuery } from '@sber-universe/om-component-library';

import { KindFilter } from './components/ActionPanel/KindFilter';

export const EventListContent = () => {
  const { data: events } = useStore($eventListInfo);
  const { kinds } = useStore($filters);
  const getItemsStatus = useStore($getEventListPageFxStatus);
  const filteredListIsEmpty = useMemo(
    () => events.length === 0 && getItemsStatus === 'done',
    [events.length, getItemsStatus],
  );
  const isMobile = useMediaQuery({ breakpoint: 'md', type: 'down' });

  return (
    <>
      <DeleteEvent />
      <div className="space-y-[34px]" data-testid="eventsForm">
        <Typography as="h2" size="32px" fontWeight="semibold">
          События
        </Typography>
        <div className="sticky top-0 bg-base-200 z-20">
          <ActionPanel />
        </div>
        {isMobile && (
          <div className="!mt-4">
            <KindFilter kinds={kinds} />
          </div>
        )}
        {filteredListIsEmpty ? (
          <>
            <UploadOnScroll />
            <EmptyFilteredList />
          </>
        ) : (
          <>
            <ScrollArrow isDisabled={filteredListIsEmpty}>
              <div className="space-y-[10px]">
                {events.map((e) => (
                  <EventInfoCard key={e.id} data={e} />
                ))}
              </div>
              <UploadOnScroll />
            </ScrollArrow>
          </>
        )}
      </div>
    </>
  );
};
