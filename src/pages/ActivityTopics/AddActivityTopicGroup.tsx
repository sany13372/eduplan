import { FC, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { FormPrompt } from '@sber-universe/om-component-library';
import { getPath, MfeRoutes, EduPlanActivityParams } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

import { addTopicGroup, componentKindsStore, topicGroupsStore } from './model';
import { AddTopicGroup } from './model/types';
import { addTopicGroupSchema } from './model/validation';
import { ActivityTopicGroupForm } from './components';

export const AddActivityTopicGroup: FC = () => {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const parentId = searchParams.get('parentId');

  const { activityId, planId } = useParams<EduPlanActivityParams>();

  const createdItemId = useStore(addTopicGroup.$createdId);

  const componentKinds = useStore(componentKindsStore.$items);
  const componentKindsLoading = useStore(componentKindsStore.$loading);

  const topicGroups = useStore(topicGroupsStore.$items);
  const topicGroupsLoading = useStore(topicGroupsStore.$loading);

  const isLoading = componentKindsLoading || topicGroupsLoading;

  useEffect(() => {
    return addTopicGroup.reset;
  }, []);

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
    if (createdItemId) {
      history.push(prevPath);
    }
  }, [createdItemId, history, prevPath]);

  if (isLoading) {
    return (
      <Typography as="p" size="12px">
        Загрузка...
      </Typography>
    );
  }

  const parent = topicGroups.find((group) => parentId === group.id);

  const newTopicGroup: AddTopicGroup = {
    eduPlanRowId: activityId,
    parent,
    componentKind: undefined,
    caption: '',
    shortTitle: '',
  };

  const onSubmit = (topicGroup: AddTopicGroup) => {
    addTopicGroup.add(topicGroup);
  };
  return (
    <div>
      <Formik<AddTopicGroup>
        initialValues={newTopicGroup}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={addTopicGroupSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <FormPrompt isEnabled={!createdItemId} />
            <ActivityTopicGroupForm
              parentIsSelected={!!parentId}
              title="Добавление структурного элемента"
              activityId={activityId}
              validationErrorsStore={addTopicGroup.$validationErrors}
              componentKinds={componentKinds}
              topicGroups={topicGroups}
            />
          </>
        )}
      </Formik>
    </div>
  );
};
