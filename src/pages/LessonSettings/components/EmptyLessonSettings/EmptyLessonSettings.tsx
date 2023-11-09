import { InfoWrapper } from '@sber-universe/om-component-library';
import { getPath, MfeRoutes } from '@constants/routes';
import { ReactComponent as NoLessonsImage } from '@src/assets/images/participants.svg';

type EmptyLessonSettingsProps = {
  planId: string;
  activityId: string;
};

export const EmptyLessonSettings = ({ planId, activityId }: EmptyLessonSettingsProps) => {
  return (
    <InfoWrapper
      size="large"
      title="Добавьте темы, чтобы начать настройку"
      subTitle="Перейдите во вкладку «%a»
и&nbsp;нажмите «Добавить тему»"
      subTitleLinks={[
        {
          to: getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW, { ':planId': planId, ':activityId': activityId }),
          label: 'Структура и темы',
          target: '_self',
        },
      ]}
      titleClassName="md:max-w-[520px]"
      subTitleClassName="md:max-w-[460px]"
    >
      <NoLessonsImage />
    </InfoWrapper>
  );
};
