import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { getPath, LessonParams, MfeRoutes } from '@constants/routes';
import { lessonInfoStore, lessonKindInfoStore } from '@src/pages/LessonContent/model';
import { useStore } from 'effector-react';
import { setNavigationInfo } from '@src/app/model';
import { LessonContent } from '@src/pages/LessonContent/LessonContent';
import './model/init';
import { LessonContentConstructor } from '@src/pages/LessonContent/LessonContentConstructor';
import { LoadingWrapper, SwitchWithDefault } from '@sber-universe/om-component-library';
import { LessonTestConstructor } from '@src/pages/LessonContent/LessonTestConstructor';

export const LessonInfo = (): JSX.Element => {
  const { lessonId } = useParams<LessonParams>();

  const getLessonInfoStatus = useStore(lessonInfoStore.$status);
  const getThemeLessonsKind = useStore(lessonKindInfoStore.$status);
  const lessonInfo = useStore(lessonInfoStore.$value);

  useEffect(() => {
    lessonInfoStore.get(lessonId);
    lessonKindInfoStore.get(lessonId);
  }, [lessonId]);

  useEffect(() => {
    if (getLessonInfoStatus === 'done' && getThemeLessonsKind === 'done') {
      const { planId, activityId } = lessonInfo;
      const params = { ':planId': planId, ':activityId': activityId };
      const path = getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_INFO, params);
      setNavigationInfo({ label: 'К занятиям', to: path });
    }
  }, [lessonInfo, getLessonInfoStatus, getThemeLessonsKind]);
  return (
    <div className="h-full">
      <LoadingWrapper
        loadingStatusList={[getLessonInfoStatus, getLessonInfoStatus]}
        errorStatusList={[getLessonInfoStatus, getLessonInfoStatus]}
      >
        <SwitchWithDefault>
          <Route exact path={getPath(MfeRoutes.LESSON_INFO_CONTENT)} component={LessonContent} />
          <Route exact path={getPath(MfeRoutes.LESSON_INFO_CONTENT_CONSTRUCTOR)} component={LessonContentConstructor} />
          <Route exact path={getPath(MfeRoutes.LESSON_INFO_TEST_CONSTRUCTOR)} component={LessonTestConstructor} />
        </SwitchWithDefault>
      </LoadingWrapper>
    </div>
  );
};
