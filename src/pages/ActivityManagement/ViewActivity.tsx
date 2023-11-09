import React from 'react';
import { Typography } from '@kit-edu/typography';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { EduPlanActivityParams } from '@constants/routes';
import { activityInfo } from '@src/pages/ActivityManagement/model';
import { Label } from '@sber-universe/om-component-library';
import { ActivityTopicListWidget } from '@src/pages/ActivityTopics';
import { useMfeBackGround } from '@utils/hooks';

export const ViewActivity = () => {
  const { planId } = useParams<EduPlanActivityParams>();

  const activityData = useStore(activityInfo.$value);

  useMfeBackGround('gray');
  if (!activityData) return null;

  return (
    <div className="space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {activityData.title}
      </Typography>

      <div className="space-y-6 flex flex-col">
        <Label caption="Сокращённое название">{activityData.shortTitle}</Label>
        <Label caption="Категория">{activityData?.category?.caption}</Label>
        <Label caption="Часть срока освоения">{activityData.eduGridElementTitle}</Label>
      </div>
      <ActivityTopicListWidget planId={planId} eduPlanRowId={activityData.id ?? ''} />
    </div>
  );
};
