import { useStore } from 'effector-react';
import { $eventListInfo, $getEventListPageFxStatus, getEventListPage } from '@src/pages/Events/model';
import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { ReactComponent as LoaderIcon } from '@src/assets/icons/common/loading.svg';

export const UploadOnScroll = () => {
  const status = useStore($getEventListPageFxStatus);
  const events = useStore($eventListInfo);
  const isLoading = useMemo(() => status === 'pending', [status]);
  const allItemsFetched = useMemo(() => events.pagination.count <= events.data.length, [events]);
  const { ref, inView } = useInView({
    initialInView: true,
  });
  useEffect(() => {
    if (!isLoading && inView && !allItemsFetched) getEventListPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, allItemsFetched]);

  return (
    <>
      <div ref={ref} />
      {isLoading && (
        <div className="flex item-center">
          <LoaderIcon width={50} height={50} />
        </div>
      )}
    </>
  );
};
