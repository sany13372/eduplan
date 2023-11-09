import { ViewEventInfo } from '@src/pages/Events/model/types';
import { Typography } from '@kit-edu/typography';
import { Badge } from '@src/components';
import { DateInfoPanel } from '@src/pages/Events/components/EventInfoCard/DateInfoPanel';
import { Actions } from '@src/pages/Events/components/EventInfoCard/Actions';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { ExternalRoutes, getExtenalPath, getPath, MfeRoutes } from '@constants/routes';
import { useIsOnlyView } from '@src/pages/Events/model/hooks';
import { useMediaQuery } from '@sber-universe/om-component-library';

import { ReactComponent as PointIcon } from './Icon.svg';

type EventInfoCardProps = {
  data: ViewEventInfo;
};

type EventInfoCardPropsInternal = EventInfoCardProps & {
  onClick: () => void;
};

export const EventInfoCardDesktop = ({ data, onClick }: EventInfoCardPropsInternal) => {
  const isOnlyView = useIsOnlyView();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      className="p-6 flex flex-none bg-white space-x-[30px] justify-between rounded-[6px] max-w-full max-w-full cursor-pointer"
      data-testid="eventCardBlock"
    >
      <div className="space-y-[18px] w-0 flex-grow flex flex-col justify-between">
        <Typography fontWeight="semibold" size="16px" as="p" className="break-all">
          {data.title}
        </Typography>
        <div className="space-x-2 flex" data-testid="eventCardInfo">
          <Badge text="Вебинар" icon={<PointIcon />} />
          <Badge text={`Участники:${data.participantCount}`} />
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center">
        <DateInfoPanel startDate={data.startDate} endDate={data.endDate} />
      </div>
      {!isOnlyView && (
        <div className="flex-shrink-0 flex items-center">
          <Actions id={data.id} isPublished={data.isPublished} endDate={data.endDate} />
        </div>
      )}
    </div>
  );
};

const EventInfoCardMobile = ({ data, onClick }: EventInfoCardPropsInternal) => {
  const isOnlyView = useIsOnlyView();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={onClick}
      className="p-6 flex flex-col space-y-4 flex-none bg-white rounded-[6px] max-w-full cursor-pointer"
      data-testid="eventCardBlock"
    >
      <Typography fontWeight="semibold" size="16px" as="p" className="break-word">
        {data.title}
      </Typography>
      <DateInfoPanel startDate={data.startDate} endDate={data.endDate} />
      <div className="flex justify-between" data-testid="eventCardInfo">
        <Badge text="Вебинар" icon={<PointIcon />} />
        <Badge text={`Участники:${data.participantCount}`} />
      </div>
      {!isOnlyView && <Actions id={data.id} isPublished={data.isPublished} endDate={data.endDate} />}
    </div>
  );
};

export const EventInfoCard = ({ data }: EventInfoCardProps) => {
  const Card = useMediaQuery({ type: 'down', breakpoint: 'md' }) ? EventInfoCardMobile : EventInfoCardDesktop;
  const history = useHistory();
  const isOnlyView = useIsOnlyView();

  const clickHandler = () => {
    const params = { ':eventId': data.id };
    const path = !isOnlyView ? getPath(MfeRoutes.EVENT_VIEW, params) : getExtenalPath(ExternalRoutes.EVENTS, params);
    history.push(path);
  };

  return <Card data={data} onClick={clickHandler} />;
};
