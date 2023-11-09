import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { InfoPanel } from '@src/components';
import { Typography } from '@kit-edu/typography';

import { activityTopicNodesStore, effortUnitStore, grouppedLessonKindsStore, resetActivityTopicList } from './model';
import { ActivityTopicTable, ActivityTopicListActions } from './components';
import './model/init';

const noLessonKindsMessage =
  'В пространстве не настроен справочник "Виды работ образовательной деятельности", "Типы учебных занятий" ' +
  'или "Виды учебных занятий". Отображение сводных данных по темам мероприятия невозможно.';

const noActivityTopicsMessage =
  'Для мероприятия плана обучения не добавлены структурные элементы и темы. ' +
  'Отображение сводных данных по темам мероприятия невозможно.';

type ActivityTopicListWidgetProps = {
  planId: string;
  eduPlanRowId: string;
};

export const ActivityTopicListWidget = ({ planId, eduPlanRowId }: ActivityTopicListWidgetProps): JSX.Element => {
  const grouppedLessonKinds = useStore(grouppedLessonKindsStore.$value);
  const grouppedLessonKindsStatus = useStore(grouppedLessonKindsStore.$status);

  const activityTopics = useStore(activityTopicNodesStore.$value);
  const activityTopicsStatus = useStore(activityTopicNodesStore.$status);

  const effortUnit = useStore(effortUnitStore.$value);
  const effortUnitStatus = useStore(effortUnitStore.$status);

  const isLoading =
    grouppedLessonKindsStatus === 'pending' || activityTopicsStatus === 'pending' || effortUnitStatus === 'pending';

  useEffect(() => {
    return resetActivityTopicList;
  }, []);

  useEffect(() => {
    grouppedLessonKindsStore.get(eduPlanRowId);
    effortUnitStore.get(eduPlanRowId);
    activityTopicNodesStore.get(eduPlanRowId);
  }, [eduPlanRowId]);

  if (isLoading) {
    return (
      <Typography as="p" size="14px">
        Загрузка...
      </Typography>
    );
  }

  const hasLessonKinds = grouppedLessonKinds.length > 0;
  const hasActivityTopics = activityTopics.length > 0;

  return (
    <div className="flex flex-col space-y-8" data-testid="activityTopicBlock">
      <div className="flex justify-between items-center">
        <Typography as="h3" size="32px" fontWeight="semibold">
          Изучаемые темы
        </Typography>
        {hasLessonKinds && <ActivityTopicListActions activityId={eduPlanRowId} planId={planId} />}
      </div>
      <div>
        {!hasLessonKinds && <InfoPanel message={noLessonKindsMessage} />}

        {hasLessonKinds && !hasActivityTopics && <InfoPanel message={noActivityTopicsMessage} />}

        {hasLessonKinds && hasActivityTopics && (
          <ActivityTopicTable workKinds={grouppedLessonKinds} activityTopics={activityTopics} effortUnit={effortUnit} />
        )}
      </div>
    </div>
  );
};
