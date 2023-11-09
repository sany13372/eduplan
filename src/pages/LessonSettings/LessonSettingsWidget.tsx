import { EmptyLessonSettings } from '@src/pages/LessonSettings/components';
import { useEffect } from 'react';
import {
  $themeListStore,
  controlFormStore,
  getInitData,
  resetDomain,
  scaleElementTypesStore,
  scaleTypesStore,
  setCommonInfo,
} from '@src/pages/LessonSettings/model';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { ThemeListInfo } from '@src/pages/LessonSettings/ThemeListInfo';
import { resetMfeBackGround, setMfeBackGround } from '@src/app/model';
import { DrawerContainer } from '@src/pages/LessonSettings/DrawerContainer';
import { useStatusList } from '@src/pages/LessonSettings/model/hooks';

import './model/init';

type LessonSettingsWidgetProps = {
  planId: string;
  activityId: string;
};
export const LessonSettingsWidget = ({ planId, activityId }: LessonSettingsWidgetProps) => {
  const statusList = useStatusList();
  const themes = useStore($themeListStore);

  useEffect(() => {
    setMfeBackGround('gray');
    return resetMfeBackGround;
  }, []);

  useEffect(() => {
    getInitData(activityId);
    setCommonInfo({ activityId, planId });
    scaleTypesStore.get();
    scaleElementTypesStore.get();
    controlFormStore.get();
    return resetDomain;
  }, [activityId, planId]);
  return (
    <LoadingWrapper errorStatusList={statusList} loadingStatusList={statusList}>
      {themes.length === 0 ? <EmptyLessonSettings planId={planId} activityId={activityId} /> : <ThemeListInfo />}
      <DrawerContainer />
    </LoadingWrapper>
  );
};
