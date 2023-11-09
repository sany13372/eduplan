import { EduGridItem } from '@src/pages/ActivityList/model/types';
import { Row } from '@sber-universe/om-component-library';
import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import { ActivityGroupMenu } from '@src/pages/ActivityList/components/EduGridElementInfo/ActivityGroupMenu';
import React, { useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { Icon } from '@kit-edu/icon';

type TitleCellProps = {
  row: Row<EduGridItem>;
};
export const TitleCell = ({ row }: TitleCellProps): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  const { isGroup, activityTitle, id } = row.original;
  const isInvalid = row.original.isGroup && row.original.isInvalid;

  const drawErrorTooltip = () => (
    <Tooltip
      trigger="mouseenter click"
      zIndex={50}
      content={
        <Typography as="p" size="12px" className="whitespace-pre-wrap">
          У мероприятий группы не совпадают часы <br /> и трудоёмкость
        </Typography>
      }
    >
      <span>
        <Icon size="16" className="text-[#f43f5f]" iconName="master-warning" />
      </span>
    </Tooltip>
  );
  const ref = useRef<HTMLDivElement | null>(null);

  const linkPath = useMemo(() => {
    return getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW, {
      ':planId': planId,
      ':activityId': id,
    });
    return getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });
  }, [id, planId]);

  const titleContent = useMemo(() => {
    return (
      <Typography as="p" size="12px" fontWeight={isGroup ? 'semibold' : 'regular'} className="truncate">
        {activityTitle}
      </Typography>
    );
  }, [activityTitle, isGroup]);

  const getTitleElement = (isLink: boolean, content: JSX.Element): JSX.Element => {
    return isLink ? (
      <Link to={linkPath} className="truncate block">
        {content}
      </Link>
    ) : (
      <div className="truncate">{content}</div>
    );
  };
  return (
    <div className="space-x-2 flex items-center w-full ">
      {isInvalid && drawErrorTooltip()}
      <Tooltip
        trigger="mouseenter click"
        delay={300}
        zIndex={50}
        // triggerTarget={ref.current}
        reference={ref.current}
        content={
          <Typography as="p" size="12px" className="whitespace-pre-wrap">
            {activityTitle}
          </Typography>
        }
      >
        {null}
      </Tooltip>
      <div ref={ref} className="truncate">
        {getTitleElement(!isGroup, titleContent)}
      </div>
      <ActivityGroupMenu item={row.original} />
    </div>
  );
};
