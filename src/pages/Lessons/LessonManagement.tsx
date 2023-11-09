import React from 'react';
import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { LessonSettings } from '@src/pages/Lessons/LessonSettings';
import { LinkStudents } from '@src/pages/Lessons/LinkStudents';
import { ViewLinkedStudents } from '@src/pages/Lessons/ViewLinkedStudents';
import { UpdateLinkedStudents } from '@src/pages/Lessons/UpdateLinkedStudents';
import { SwitchWithDefault } from '@sber-universe/om-component-library';

import './model/init';

export const LessonManagement = (): JSX.Element => {
  return (
    <SwitchWithDefault>
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_STUDENTS)} component={LinkStudents} />
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_SETTINGS)} component={LessonSettings} />
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_STUDENTS_EDIT)} component={UpdateLinkedStudents} />
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_LESSON_STUDENTS_VIEW)} component={ViewLinkedStudents} />
    </SwitchWithDefault>
  );
};
