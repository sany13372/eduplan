import { FC, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { FormPrompt } from '@sber-universe/om-component-library';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

import { updateTopicItem, topicGroupsStore, grouppedLessonKindsStore, effortUnitStore } from './model';
import { normalizeEffortsInMinutes, convertToRawEfforts } from './model/efforts';
import { UpdateTopicItem, FormUpdateTopicItem } from './model/types';
import { createUpdateTopicItemSchema } from './model/validation';
import { ActivityTopicItemForm, noTopicGroup } from './components';

export interface UpdateActivityTopicItemProps {
  topicItem: UpdateTopicItem;
}

export const UpdateActivityTopicItem: FC<UpdateActivityTopicItemProps> = ({ topicItem }) => {
  const history = useHistory();
  const { activityId, planId } = useParams<EduPlanActivityParams>();

  const isUpdated = Boolean(useStore(updateTopicItem.$updatedId));

  const topicGroupsLoading = useStore(topicGroupsStore.$loading);

  const grouppedLessonKinds = useStore(grouppedLessonKindsStore.$value);
  const grouppedLessonKindsStatus = useStore(grouppedLessonKindsStore.$status);

  const effortUnit = useStore(effortUnitStore.$value);
  const effortUnitStatus = useStore(effortUnitStore.$status);

  const isLoading = topicGroupsLoading || grouppedLessonKindsStatus === 'pending' || effortUnitStatus === 'pending';

  const initialTopicItem = useMemo(() => {
    return {
      ...topicItem,
      parent: topicItem.parent ?? noTopicGroup,
      efforts: normalizeEffortsInMinutes(topicItem.efforts, grouppedLessonKinds),
      eduPlanRowId: activityId,
    };
  }, [topicItem, grouppedLessonKinds, activityId]);

  const updateTopicItemSchema = useMemo(() => createUpdateTopicItemSchema(grouppedLessonKinds), [grouppedLessonKinds]);

  useEffect(() => {
    topicGroupsStore.get(activityId);
    grouppedLessonKindsStore.get(activityId);
    effortUnitStore.get(activityId);
  }, [activityId]);

  const prevPath: string = useMemo(
    () => getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW, { ':planId': planId, ':activityId': activityId }),
    [activityId, planId],
  );

  useEffect(() => {
    setNavigationInfo({ label: 'К карточке мероприятия', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  useEffect(() => {
    if (isUpdated) {
      history.push(prevPath);
    }
  }, [isUpdated, history, prevPath]);

  if (isLoading) {
    return (
      <Typography as="p" size="12px">
        Загрузка...
      </Typography>
    );
  }

  const onSubmit = (updatedTopicItem: FormUpdateTopicItem) => {
    updateTopicItem.update({
      ...updatedTopicItem,
      efforts: convertToRawEfforts(updatedTopicItem.efforts, grouppedLessonKinds),
    });
  };

  return (
    <div>
      <Formik<FormUpdateTopicItem>
        initialValues={initialTopicItem}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={updateTopicItemSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <FormPrompt isEnabled={!isUpdated} />
            <ActivityTopicItemForm
              title="Редактирование темы"
              activityId={activityId}
              validationErrorsStore={updateTopicItem.$validationErrors}
              workKinds={grouppedLessonKinds}
              effortUnit={effortUnit}
            />
          </>
        )}
      </Formik>
    </div>
  );
};
