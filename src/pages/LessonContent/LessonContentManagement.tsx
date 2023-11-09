import React from 'react';
import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { LessonInfo } from '@src/pages/LessonContent/LessonInfo';
import { SwitchWithDefault } from '@sber-universe/om-component-library';

export const LessonContentManagement = (): JSX.Element => {
  return (
    <SwitchWithDefault>
      <Route path={getPath(MfeRoutes.LESSON_INFO_ROOT)} component={LessonInfo} />
    </SwitchWithDefault>
  );
};
