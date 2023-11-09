import { useStore } from 'effector-react';
import {
  $getInitDataStatus,
  $scoreInfoMapStore,
  $selectedFilterItemStore,
  $streamMapStore,
  $themeListStore,
  controlFormStore,
  scaleElementTypesStore,
  scaleTypesStore,
} from '@src/pages/LessonSettings/model/index';
import { useMemo } from 'react';
import { allThemeFilter } from '@src/pages/LessonSettings/model/constants';
import { DrawerData, ScoreInfo, StreamCountObj } from '@src/pages/LessonSettings/model/types';

export const useFilteredThemeList = () => {
  const themeList = useStore($themeListStore);
  const filter = useStore($selectedFilterItemStore);
  const filteredThemeList = useMemo(
    () => (filter.id === allThemeFilter.id ? themeList : themeList.filter((e) => e.id === filter.id)),
    [themeList, filter],
  );
  return filteredThemeList;
};

export const useStreamCount = (id: string): StreamCountObj => {
  const streamMap = useStore($streamMapStore);
  const streamList = streamMap[id] ?? [];
  const streamCount = streamList.length;
  const activeStreamCount = streamList.reduce((curr, acc) => (acc.isPublic ? curr + 1 : curr), 0);
  return { streamCount, activeStreamCount };
};

export const useScoreInfo = (id = ''): ScoreInfo | null => {
  const scoreInfoMap = useStore($scoreInfoMapStore);
  return scoreInfoMap[id] ?? null;
};

export const usePublStreamCount = (lessonId = ''): number => {
  const streamMapStore = useStore($streamMapStore);
  return (streamMapStore[lessonId] ?? []).filter((e) => e.isPublic).length;
};

export const useItemsInfo = (data: DrawerData | null = { id: '', themeId: '', lessonId: '' }) => {
  const themeList = useStore($themeListStore);
  const streamMap = useStore($streamMapStore);
  const theme = themeList.find((e) => e.id === data?.themeId);
  const lesson = theme?.lessons.find((e) => e.id === data?.lessonId);
  const stream = streamMap[data?.lessonId ?? '']?.find((e) => e.id === (data?.id ?? ''));
  return {
    theme: theme ?? null,
    lesson: lesson ?? null,
    stream: stream ?? null,
  };
};

export const useStatusList = () => {
  const status = useStore($getInitDataStatus);
  const scaleTypesStatus = useStore(scaleTypesStore.$status);
  const scaleElementStatus = useStore(scaleElementTypesStore.$status);
  const controlFormStatus = useStore(controlFormStore.$status);
  return [scaleTypesStatus, scaleElementStatus, controlFormStatus, status];
};
