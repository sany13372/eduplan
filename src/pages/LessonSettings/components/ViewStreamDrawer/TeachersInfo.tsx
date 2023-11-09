import { ContentPanel, OpenDrawerButton } from '@src/pages/LessonSettings/components';
import classNames from 'classnames';
import { Typography } from '@kit-edu/typography';
import { ColorBadge } from '@sber-universe/om-component-library';
import React, { useEffect, useMemo } from 'react';
import { Lesson, Stream } from '@src/pages/LessonSettings/model/types';
import { SolidNotification } from '@src/components';
import { lessonKindsWithScores } from '@src/pages/LessonSettings/model/constants';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { Button } from '@kit-edu/button';
import { Link } from '@kit-edu/typography/build/presets/Link';
import { Tooltip } from '@kit-edu/tooltip';
import { useStore } from 'effector-react';
import { $commonInfo, availableToLinkTeachersCount, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { fullNameToShortFullName } from '@src/pages/LessonSettings/model/utils';

const TooltipContent = ({ lesson }: { lesson: Lesson | null }) => {
  const { planId } = useStore($commonInfo);
  const to = getPath(MfeRoutes.EDU_PLAN_TEACHERS, { ':planId': planId });
  const title = useMemo(() => (lesson?.lessonKind.systemCode === 'homework' ? 'проверяющими' : 'на поток'), [lesson]);
  return (
    <Typography size="12px" color="white">
      Сначала добавьте преподавателей на мероприятие, чтобы назначить их {title}. Это можно сделать во вкладке «
      <Link to={to} variant="body-6" color="primary">
        Преподаватели
      </Link>
      »
    </Typography>
  );
};

const AddTeachersButton = ({ stream, lesson }: { stream: Stream; lesson: Lesson | null }) => {
  const counts = useStore(availableToLinkTeachersCount.$value);

  useEffect(() => {
    if (stream) {
      availableToLinkTeachersCount.get(stream?.lessonImplId ?? '');
    }
  }, [stream]);
  const clickHandler = () => {
    setDrawerInfo({ type: 'LINK_TEACHERS', val: stream });
  };
  return (
    <Tooltip disabled={Boolean(counts)} maxWidth="230px" placement="left" content={<TooltipContent lesson={lesson} />}>
      <Button disabled={!counts} appearance="light-outline" size="medium" onClick={clickHandler}>
        Добавить
      </Button>
    </Tooltip>
  );
};

const UpdateTeachersButton = ({ stream }: { stream: Stream }) => {
  return <OpenDrawerButton type="VIEW_LINKED_TEACHERS" val={stream} />;
};
const EmptyListWarning = () => (
  <SolidNotification variant="embedded" template="Чтобы назначить проверяющих, нажмите на кнопку «Добавить»" />
);

const TeachersList = ({ items }: { items: string[] }) => {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {items.map((e, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <ColorBadge text={fullNameToShortFullName(e)} key={i} appearance="default" size="medium" />
      ))}
    </div>
  );
};
type TeachersInfoProps = {
  stream: Stream;
};

export const TeachersInfo = ({ stream }: TeachersInfoProps) => {
  const { lesson } = useItemsInfo(stream);
  const isVisible = lessonKindsWithScores.includes(lesson?.lessonKind?.systemCode ?? '');

  const { teacherList } = stream;
  const teachersCount = teacherList.length;
  if (!isVisible) return null;

  return (
    <ContentPanel variant="white" className={classNames(' flex flex-col gap-y-2 px-6 pb-6 pt-[18px]')}>
      <div className="flex items-center justify-between space-x-4">
        <Typography as="h4" size="16px" fontWeight="semibold">
          Проверяющие
        </Typography>
        {teachersCount === 0 ? (
          <AddTeachersButton stream={stream} lesson={lesson} />
        ) : (
          <UpdateTeachersButton stream={stream} />
        )}
      </div>

      {teachersCount === 0 ? <EmptyListWarning /> : <TeachersList items={stream.teacherList} />}
    </ContentPanel>
  );
};
