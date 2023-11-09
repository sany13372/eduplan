import React from 'react';
import { LessonsWidget } from '@src/pages/Lessons';
import { useParams } from 'react-router-dom';
import { EduPlanActivityParams } from '@constants/routes';
import { useMfeBackGround } from '@utils/hooks';

export const LessonsInfo = (): JSX.Element => {
  const { activityId } = useParams<EduPlanActivityParams>();
  useMfeBackGround('gray');

  return (
    <div className="space-y-8" data-testid="lessonForm">
      <LessonsWidget eduPlanRowId={activityId} />
    </div>
  );
};
