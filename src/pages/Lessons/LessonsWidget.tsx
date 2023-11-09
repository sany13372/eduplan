import { useGate, useStore } from 'effector-react';
import classNames from 'classnames';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import { Icon } from '@kit-edu/icon';
import { activityName, themesWithLessons, showSaveLessonForm, LessonsGate } from '@src/pages/Lessons/model';
import { ThemeWithLessons, Lesson } from '@src/pages/Lessons/model/types.new';
import { Badge } from '@src/components';
import { ReactComponent as WarningIcon } from '@src/assets/icons/common/warning.svg';
import React, { useEffect, useState } from 'react';
import Pandora from '@baldrick/pandora-box';
import { getPath } from '@constants/routes';
import { Link } from 'react-router-dom';
import { getLessonContentRoute } from '@src/pages/Lessons/model/utils';

import './model/init';

import { DeleteLessonConfirmDialog, Collapse, LessonActionMenu, EmptyInfo } from './components';
import { ConfirmLessonErrorDialog } from './components/ConfirmLessonErrorDialog';

export type LessonsWidgetProps = {
  eduPlanRowId: string;
};

const ThemeSubtitle: React.FC<{ theme: ThemeWithLessons }> = ({ theme }) => {
  return theme.lessonsCount > 0 ? (
    <div className="flex items-center">
      <Typography className="text-gray-400 mr-1">Занятия:</Typography> {theme.lessonsCount}
    </div>
  ) : (
    <div className="flex items-center">
      <WarningIcon className="mr-2" />
      <Typography className="color-gray-500" size="14px">
        Чтобы добавить первое занятие в тему, нажмите на кнопку «Добавить занятие»
      </Typography>
    </div>
  );
};

const Lessons: React.FC<{ theme: ThemeWithLessons }> = ({ theme }) => {
  const linkPath = (lesson: Lesson) => {
    const neededContentRoute = getLessonContentRoute(lesson.lessonContentType);
    return getPath(neededContentRoute, {
      ':lessonId': lesson.id,
    });
  };
  return (
    <div className="rounded-l border-s border-gray-300">
      {theme.lessons.map((lesson, index) => (
        <div
          key={lesson.id}
          className={classNames('flex items-center p-4', {
            'border-b-s border-gray-300': index !== theme.lessons.length - 1,
          })}
          data-testid="lessonBlock"
        >
          <div className="flex flex-col items-start mr-auto">
            <Link to={() => linkPath(lesson)}>
              <Typography size="14px">{lesson.title}</Typography>
            </Link>
            <div className="flex items-center mt-1">
              <Typography className="text-gray-400" size="12px">
                {lesson.kind}
              </Typography>
              {!lesson.hasContent && (
                <>
                  <Icon iconName="master-dot" className="text-rose-500 mx-1" size="12" />
                  <Typography className="text-rose-500" size="12px">
                    Контент не добавлен
                  </Typography>
                </>
              )}
            </div>
          </div>
          <div className="min-w-[175px] w-[175px] flex items-center justify-between">
            {lesson.isAllowRegistration ? (
              <Badge appearance="success" text="Согласовано" />
            ) : (
              <Badge appearance="warning" text="Не согласовано" />
            )}
            <LessonActionMenu lesson={lesson} theme={theme} />
          </div>
        </div>
      ))}
    </div>
  );
};

function useHeaderOffset() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const { events } = Pandora();
    const unsub = events.subscribe('layout:headerOverlayHeightChanged', (val) => {
      setOffset(Number(val));
    });
    return unsub;
  }, []);

  return offset;
}

const Themes: React.FC<{ themes: ThemeWithLessons[] }> = ({ themes }) => {
  const headerOffset = useHeaderOffset();
  return (
    <Collapse sticky={{ top: headerOffset }}>
      {themes.map((theme) => (
        <Collapse.Panel
          key={theme.id}
          title={theme.title}
          disabled={theme.lessonsCount === 0}
          subtitle={<ThemeSubtitle theme={theme} />}
          actions={
            <Button appearance="dark-outline" onClick={() => showSaveLessonForm({ themeId: theme.rowId })}>
              Добавить занятие
            </Button>
          }
        >
          <Lessons theme={theme} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export const LessonsWidget = (props: LessonsWidgetProps): JSX.Element => {
  useGate(LessonsGate, props);
  const status = useStore(themesWithLessons.$status);
  const activityNameStatus = useStore(activityName.$status);
  const data = useStore(themesWithLessons.$value);
  const activityNameValue = useStore(activityName.$value);
  const statusList = [activityNameStatus, status];
  const isEmpty = status === 'done' && data.length === 0;

  return (
    <LoadingWrapper errorStatusList={statusList} loadingStatusList={statusList}>
      <div className="space-y-8">
        <Typography as="h2" size="32px" fontWeight="semibold">
          {activityNameValue}
        </Typography>
        <div className="space-y-2">
          <Themes themes={data} />
        </div>
        {isEmpty && <EmptyInfo />}
        <DeleteLessonConfirmDialog />
        <ConfirmLessonErrorDialog />
      </div>
    </LoadingWrapper>
  );
};
