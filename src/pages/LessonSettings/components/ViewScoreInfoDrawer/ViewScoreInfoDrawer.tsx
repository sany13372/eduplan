import { Drawer } from '@sber-universe/om-component-library';
import { $scoreInfoMapStore, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { LessonDescBlock } from '@src/pages/LessonSettings/components';
import React from 'react';
import { useStore } from 'effector-react';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';

import { ScoreInfo, EmptyScoreInfo } from './ScoreInfo';

export type ViewScoreInfoDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const ViewScoreInfoDrawer = ({ isOpen, data }: ViewScoreInfoDrawerProps) => {
  const { lesson } = useItemsInfo(data);
  const scoreInfoMap = useStore($scoreInfoMapStore);
  const scoreInfo = scoreInfoMap[data?.lessonId ?? ''];
  if (!lesson) return null;

  const onClose = () => {
    setDrawerInfo({ type: 'VIEW_SCORE_INFO', val: null });
  };

  return (
    <Drawer
      containerClassname="max-w-[900px]"
      onClose={onClose}
      isOpen={isOpen}
      lockScroll
      backDropProps={{
        isTransparent: false,
        isDisabled: false,
        isClickable: true,
      }}
    >
      <Drawer.Header title="Критерии оценки" onClose={onClose} />
      <Drawer.Content containerClassname="flex flex-col gap-y-4">
        <LessonDescBlock title={lesson.title} lessonKindCaption={lesson.lessonKind.caption} />
        {scoreInfo ? <ScoreInfo data={data} scoreInfo={scoreInfo} /> : <EmptyScoreInfo data={data} />}
      </Drawer.Content>
    </Drawer>
  );
};
