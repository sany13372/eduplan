import { CopyToClipboard, DateRangeInfo, Panel, TextGroup } from '@src/components';
import { ViewEventInfo } from '@src/pages/Events/model/types';
import { ReactComponent as CalendarIcon } from '@src/assets/icons/events/calendarIcon.svg';
import { ReactComponent as FormatIcon } from '@src/assets/icons/events/formatIcon.svg';
import { ReactComponent as KindIcon } from '@src/assets/icons/events/kindIcon.svg';
import { ReactComponent as PlaceIcon } from '@src/assets/icons/events/placeIcon.svg';
import { ReactComponent as VideoIcon } from '@src/assets/icons/events/videoIcon.svg';
import { Typography } from '@kit-edu/typography';
import { Icon } from '@kit-edu/icon';
import { Badge, ColorBadge } from '@sber-universe/om-component-library';
import { isVideoConfWebinarLink } from '@src/pages/Events/model/utils';
import { Button } from '@kit-edu/button';

type FullEventInfoProps = { item: ViewEventInfo };
export const FullEventInfo = ({ item }: FullEventInfoProps) => {
  const webinarLink = item.videoConfKind && isVideoConfWebinarLink(item.videoConfKind);
  const panelClassName = 'p-4 md:px-[30px] md:py-[18px]  space-x-[30px] flex md:items-center';
  return (
    <div className="space-y-[50px]">
      <div className="grid grid-cols-2 gap-6" data-testid="eventInfo">
        <Panel className={`${panelClassName} col-span-2 md:col-span-1`}>
          <KindIcon />
          <TextGroup mainText={item.kind.caption} secondaryText="Вид" />
        </Panel>
        <Panel className={`${panelClassName} col-span-2 md:col-span-1`}>
          <FormatIcon />
          <TextGroup mainText={item.format.caption} secondaryText="Формат" />
        </Panel>
        <Panel className={`${panelClassName} col-span-2`}>
          <CalendarIcon />
          <DateRangeInfo startDate={item.startDate ?? ''} endDate={item.endDate ?? ''} />
        </Panel>
      </div>
      <div className="flex flex-col space-y-[30px]">
        {item.place && (
          <div
            data-testid="event-place"
            className="flex flex-col space-y-4 md:flex-row md:space-x-[30px] md:space-y-0 md:items-center"
          >
            <PlaceIcon className="flex-shrink-0" />
            <Typography as="p" size="16px" lineHeight="high">
              {item.place}
            </Typography>
          </div>
        )}
        {item.videoConfKind && item.videoConfKind.systemCode !== 'other' && (
          <div
            data-testid="event-video-conf-kind"
            className="flex flex-col space-y-4 md:flex-row md:space-x-[30px] md:space-y-0 md:items-center"
          >
            <div className="h-[50px] w-[50px] rounded-full bg-base-100 flex justify-center items-center">
              <Icon iconName="master-headphone" className="flex-shrink-0" />
            </div>
            <Badge appearance="green-solid" size="small">
              {item.videoConfKind.caption}
            </Badge>
          </div>
        )}
        {item.link && (
          <CopyToClipboard
            dataTestId="event-link"
            text={item.link}
            badgeText={webinarLink ? 'Индивидуальная ссылка' : ''}
          />
        )}
        {!item.link && webinarLink && (
          <CopyToClipboard
            dataTestId="event-link"
            badgeText="Индивидуальная ссылка"
            error={
              <div className="flex items-center space-x-2">
                <Icon iconName="master-warning" className="text-amber-200" />
                <span className="text-sm">Вы не включены в список участников события</span>
              </div>
            }
          />
        )}
        {webinarLink && (
          <div
            className="flex flex-col space-y-4 md:flex-row md:space-x-[30px] md:space-y-0 md:items-center"
            data-testid="event-record"
          >
            <div className="flex space-x-[30px] items-center">
              <div className="h-[50px] w-[50px] rounded-full bg-base-100 flex justify-center items-center">
                <VideoIcon />
              </div>
              {item.webinarLink ? (
                <ColorBadge className="text-black" text="Запись события доступна" appearance="success" size="medium" />
              ) : (
                <ColorBadge
                  className="text-black"
                  text="Запись события пока не доступна"
                  appearance="error"
                  size="medium"
                />
              )}
            </div>

            <Button
              size="small"
              disabled={!item.webinarLink}
              appearance="dark-outline"
              onClick={() => {
                if (item.webinarLink) {
                  window.open(item.webinarLink, '_blank');
                }
              }}
            >
              Смотреть
            </Button>
          </div>
        )}
        <div />
        {item.description && (
          <div className="flex flex-col space-y-[30px]" data-testid="aboutEvent">
            <Typography as="h2" size="20px" fontWeight="semibold">
              О событии
            </Typography>
            <Typography as="p" size="16px" lineHeight="high" className="break-words">
              {item.description}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
