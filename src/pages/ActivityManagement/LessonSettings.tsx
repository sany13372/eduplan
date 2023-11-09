import { EduPlanActivityParams } from '@constants/routes';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LessonSettingsWidget } from '@src/pages/LessonSettings';

export const LessonSettings = () => {
  const { planId, activityId } = useParams<EduPlanActivityParams>();

  return <LessonSettingsWidget planId={planId} activityId={activityId} />;
};
