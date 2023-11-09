import { LinkT } from '@sber-universe/om-component-library';
import { getPath, MfeRoutes } from '@constants/routes';
import { useStore } from 'effector-react';
import { $commonInfo } from '@src/pages/LessonSettings/model';
import { useMemo } from 'react';
import { SolidNotification } from '@src/components';

const defaultTemplate =
  'Чтобы начать настройку обучения, вам нужно добавить занятия.  Для этого перейдите в раздел «%a» и нажмите кнопку «Добавить занятие».';
const activeTemplate =
  'Чтобы начать настройку обучения, вам нужно согласовать занятия. Для этого перейдите в раздел "%a" и нажмите кнопку "Согласовать"';

type EmptyLessonNotificationProps = {
  type?: 'default' | 'active';
};

export const EmptyLessonNotification = ({ type = 'default' }: EmptyLessonNotificationProps) => {
  const { planId, activityId } = useStore($commonInfo);
  const template = type === 'default' ? defaultTemplate : activeTemplate;

  const links: LinkT[] = useMemo(
    () => [
      {
        label: 'Занятия',
        to: getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_INFO, {
          ':planId': planId,
          ':activityId': activityId,
        }),
      },
    ],
    [activityId, planId],
  );
  return <SolidNotification template={template} links={links} variant="standalone" />;
};
