import React from 'react';
import { DotDividersContainer } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { ButtonWithHint, ContentPanel } from '@src/pages/LessonSettings/components';
import { DrawerData, ScoreInfo as ScoreInfoT } from '@src/pages/LessonSettings/model/types';
import { deleteScoreInfo, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { usePublStreamCount } from '@src/pages/LessonSettings/model/hooks';
import { SolidNotification } from '@src/components';
import { TextBlock } from '@src/pages/LessonSettings/components/StreamInfo/Blocks';

import { GradeSettingsTable } from './GradeSettingsTable';

const ScoreInfoTitle = ({ subTitle }: { subTitle?: string }) => {
  return (
    <DotDividersContainer className="flex flex-row gap-1 items-center">
      <Typography as="h4" size="16px" fontWeight="semibold">
        Форма контроля
      </Typography>
      {subTitle && (
        <Typography as="h4" size="14px" color="medium">
          {subTitle}
        </Typography>
      )}
    </DotDividersContainer>
  );
};
export const ScoreInfo = ({ scoreInfo, data }: { scoreInfo: ScoreInfoT; data: DrawerData | null }) => {
  const publStreamCount = usePublStreamCount(data?.lessonId);
  const settingsIsDisabled = publStreamCount !== 0;
  const onUpdateClick = () => {
    setDrawerInfo({ type: 'UPDATE_SCORE_INFO', val: data });
  };
  const onDeleteClick = () => {
    deleteScoreInfo.setItem(scoreInfo);
  };
  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-4 !pt-[18px] !pb-6">
      <div className="flex items-center justify-between gap-6">
        <ScoreInfoTitle subTitle={scoreInfo.controlForm?.caption} />

        <div className="flex gap-4">
          <ButtonWithHint
            hintProps={{
              maxWidth: '210px',
              text: 'Чтобы удалить форму контроля, остановите все потоки обучающихся',
            }}
            disabled={settingsIsDisabled}
            size="medium"
            appearance="light-outline"
            onClick={onDeleteClick}
            iconLeftName="master-master-delete"
          />
          <ButtonWithHint
            hintProps={{
              maxWidth: '221px',
              text: 'Чтобы изменить критерии оценки для занятия, остановите все потоки обучающихся',
              placement: 'left',
            }}
            disabled={settingsIsDisabled}
            size="medium"
            appearance="light-outline"
            onClick={onUpdateClick}
            iconLeftName="master-edit"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <ContentPanel variant="gray">
          <TextBlock label="Шкала оценки" value={scoreInfo.gradeScale.caption} />
        </ContentPanel>
        <ContentPanel variant="gray">
          <TextBlock label="Максимальный балл" value={scoreInfo.lessonScoreValue} />
        </ContentPanel>
      </div>
      <GradeSettingsTable gradeSettings={scoreInfo.gradeSettings} />
    </ContentPanel>
  );
};

type EmptyScoreInfoProps = {
  data: DrawerData | null;
};

export const EmptyScoreInfo = ({ data }: EmptyScoreInfoProps) => {
  const publStreamCount = usePublStreamCount(data?.lessonId);
  const settingsIsDisabled = publStreamCount !== 0;
  const onUpdateClick = () => {
    setDrawerInfo({ type: 'UPDATE_SCORE_INFO', val: data });
  };

  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-2 !pt-[18px] !pb-6">
      <div className="flex items-center justify-between gap-6">
        <ScoreInfoTitle />
        <ButtonWithHint
          hintProps={{
            maxWidth: '261px',
            text: 'Чтобы задать критерии оценки для занятия, остановите все потоки обучающихся',
          }}
          disabled={settingsIsDisabled}
          size="medium"
          appearance="light-outline"
          onClick={onUpdateClick}
        >
          Настроить
        </ButtonWithHint>
      </div>
      <SolidNotification template="Чтобы задать критерии оценки для занятия, нажмите «Настроить»" variant="embedded" />
    </ContentPanel>
  );
};
