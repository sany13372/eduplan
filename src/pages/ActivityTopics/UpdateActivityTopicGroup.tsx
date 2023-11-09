import { FC, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { FormPrompt } from '@sber-universe/om-component-library';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

import { updateTopicGroup, componentKindsStore, topicGroupsStore } from './model';
import { UpdateTopicGroup } from './model/types';
import { updateTopicGroupSchema } from './model/validation';
import { ActivityTopicGroupForm, noTopicGroup } from './components';

export interface UpdateActivityTopicGroupProps {
  topicGroup: UpdateTopicGroup;
}

export const UpdateActivityTopicGroup: FC<UpdateActivityTopicGroupProps> = ({ topicGroup }) => {
  const history = useHistory();
  const { activityId, planId } = useParams<EduPlanActivityParams>();

  const initialTopicGroup = useMemo(() => {
    return topicGroup.parent ? topicGroup : { ...topicGroup, parent: noTopicGroup };
  }, [topicGroup]);

  const isUpdated = Boolean(useStore(updateTopicGroup.$updatedId));

  const componentKinds = useStore(componentKindsStore.$items);
  const componentKindsLoading = useStore(componentKindsStore.$loading);

  const topicGroups = useStore(topicGroupsStore.$items);
  const topicGroupsLoading = useStore(topicGroupsStore.$loading);

  const isLoading = componentKindsLoading || topicGroupsLoading;

  useEffect(() => {
    componentKindsStore.get(activityId);
    topicGroupsStore.get(activityId);
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

  const onSubmit = (updatedTopicGroup: UpdateTopicGroup) => {
    updateTopicGroup.update({
      ...updatedTopicGroup,
      eduPlanRowId: activityId,
    });
  };

  return (
    <div>
      <Formik<UpdateTopicGroup>
        initialValues={initialTopicGroup}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={updateTopicGroupSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <FormPrompt isEnabled={!isUpdated} />
            <ActivityTopicGroupForm
              parentIsSelected={false}
              title="Редактирование структурного элемента"
              activityId={activityId}
              validationErrorsStore={updateTopicGroup.$validationErrors}
              componentKinds={componentKinds}
              topicGroups={topicGroups}
            />
          </>
        )}
      </Formik>
    </div>
  );
};
