import { Stream } from '@src/pages/LessonSettings/model/types';
import { ContentPanel, OpenDrawerButton } from '@src/pages/LessonSettings/components';
import classNames from 'classnames';
import { Typography } from '@kit-edu/typography';
import React, { useEffect, useMemo } from 'react';
import { noun } from 'plural-ru';
import { SolidNotification } from '@src/components';
import { useStore } from 'effector-react';
import {
  $commonInfo,
  $drawerInfoMapStore,
  availableToLinkStudentsCount,
  setDrawerInfo,
  studentEduplanCounts,
} from '@src/pages/LessonSettings/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { Link } from '@kit-edu/typography/build/presets/Link';
import { Button } from '@kit-edu/button';
import { Tooltip } from '@kit-edu/tooltip';

const TooltipStudentsContent = () => {
  const { planId } = useStore($commonInfo);
  const to = getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST, { ':planId': planId });
  return (
    <Typography size="12px" color="white">
      Сначала добавьте обучающихся в план обучения. Это можно сделать во вкладке «
      <Link to={to} variant="body-6" color="primary">
        Обучающиеся
      </Link>
      »
    </Typography>
  );
};

const TooltipIotContent = () => {
  const { planId } = useStore($commonInfo);
  const to = getPath(MfeRoutes.EDU_PLAN_INFO_IOT, { ':planId': planId });
  return (
    <Typography size="12px" color="white">
      Сначала добавьте мероприятие в индивидуальные образовательные траектории. Это можно сделать во вкладке «
      <Link to={to} variant="body-6" color="primary">
        Траектории обучения
      </Link>
      »
    </Typography>
  );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AddStudentsButton = ({ stream }: { stream: Stream }) => {
  const studentsIotCounts = useStore(availableToLinkStudentsCount.$value);
  const studentsEduplanCounts = useStore(studentEduplanCounts.$value);
  const { planId } = useStore($commonInfo);
  const drawerInfoMap = useStore($drawerInfoMapStore);
  useEffect(() => {
    if (stream) {
      availableToLinkStudentsCount.get(stream?.lessonImplId ?? '');
      studentEduplanCounts.get(planId);
    }
  }, [stream, planId, drawerInfoMap]);
  const tooltipIsAvailable = !studentsEduplanCounts || !studentsIotCounts;
  const content = useMemo(() => {
    if (!studentsEduplanCounts) return <TooltipStudentsContent />;
    if (!studentsIotCounts) return <TooltipIotContent />;
    return null;
  }, [studentsIotCounts, studentsEduplanCounts]);

  const onCLick = () => {
    setDrawerInfo({ type: 'LINK_STUDENTS', val: stream });
  };
  return (
    <Tooltip disabled={!tooltipIsAvailable} maxWidth="230px" placement="left" content={content}>
      <Button appearance="light-outline" disabled={tooltipIsAvailable} size="medium" onClick={onCLick}>
        Добавить
      </Button>
    </Tooltip>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UpdateStudentsButton = ({ stream }: { stream: Stream }) => {
  return <OpenDrawerButton type="VIEW_LINKED_STUDENTS" val={stream} />;
};
const EmptyListWarning = () => (
  <SolidNotification
    variant="embedded"
    template="Чтобы создать список обучающихся потока, нажмите на кнопку «Добавить»"
  />
);

const StudentCount = ({ count }: { count: number }) => {
  const validWordForm = noun(count, ' человек', ' человека', ' человек');

  return (
    <Typography size="14px">
      <span className="font-semibold">{count}</span>
      {validWordForm}
    </Typography>
  );
};

type StudentsInfoProps = {
  stream: Stream;
};

export const StudentsInfo = ({ stream }: StudentsInfoProps) => {
  const { studentCount } = stream;
  return (
    <ContentPanel variant="white" className={classNames(' flex flex-col gap-y-2 px-6 pb-6 pt-[18px]')}>
      <div className="flex items-center justify-between space-x-4">
        <Typography as="h4" size="16px" fontWeight="semibold">
          Обучающиеся
        </Typography>
        {studentCount === 0 ? <AddStudentsButton stream={stream} /> : <UpdateStudentsButton stream={stream} />}
      </div>

      {studentCount === 0 ? <EmptyListWarning /> : <StudentCount count={studentCount} />}
    </ContentPanel>
  );
};
