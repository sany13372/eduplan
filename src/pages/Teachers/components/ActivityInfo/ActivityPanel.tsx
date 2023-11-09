import { setAddTeacherDrawerInfo } from '@src/pages/Teachers/model';
import React, { useMemo } from 'react';
import { Typography } from '@kit-edu/typography';
import { Tooltip } from '@kit-edu/tooltip';
import { Button } from '@kit-edu/button';
import { InfoMessage } from '@src/components';

type ActivityPanelProps = {
  title: string;
  teacherCount: number;
  totalTeacherCount: number;
  path: string;
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export const ActivityPanel = ({ totalTeacherCount, teacherCount, title, path }: ActivityPanelProps) => {
  const clickHandler = () => setAddTeacherDrawerInfo(path);

  const addButtonIsDisabled = useMemo(() => teacherCount >= totalTeacherCount, [totalTeacherCount, teacherCount]);

  return (
    <div className="flex flex-col bg-white rounded-xs space-y-[18px]  px-6 py-4">
      <div className="flex justify-between items-center space-x-6">
        <Typography as="p" size="16px" fontWeight="semibold" className="truncate">
          {title}
        </Typography>
        <Tooltip
          placement="top"
          disabled={!addButtonIsDisabled}
          content={
            <Typography as="p" className="w-[192px]" size="12px">
              Все преподаватели, добавленные в образовательное пространство, назначены на мероприятие плана обучения
            </Typography>
          }
        >
          <div>
            <Button disabled={addButtonIsDisabled} size="medium" appearance="dark-outline" onClick={clickHandler}>
              Добавить
            </Button>
          </div>
        </Tooltip>
      </div>
      {teacherCount === 0 && (
        <InfoMessage
          message="Преподаватели ещё не назначены. Чтобы назначить преподавателей, нажмите на кнопку «Добавить»"
          description=""
        />
      )}
    </div>
  );
};
