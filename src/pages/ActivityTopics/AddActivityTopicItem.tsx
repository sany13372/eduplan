import { FC, useEffect, useMemo } from 'react';
import { Formik } from 'formik';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { FormPrompt } from '@sber-universe/om-component-library';
import { getPath, MfeRoutes, EduPlanActivityParams } from '@constants/routes';
import { Typography } from '@kit-edu/typography';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

import { addTopicItem, partTypesStore, topicGroupsStore, grouppedLessonKindsStore, effortUnitStore } from './model';
import { normalizeEffortsInMinutes, convertToRawEfforts } from './model/efforts';
import { FormAddTopicItem } from './model/types';
import { createAddTopicItemSchema } from './model/validation';
import { ActivityTopicItemForm } from './components';

export const AddActivityTopicItem: FC = () => {
  const history = useHistory();
  const { activityId, planId } = useParams<EduPlanActivityParams>();

  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const parentId = searchParams.get('parentId');

  const createdItemId = useStore(addTopicItem.$createdId);

  const partTypes = useStore(partTypesStore.$items);
  const partTypesLoading = useStore(partTypesStore.$loading);

  const topicGroups = useStore(topicGroupsStore.$items);
  const topicGroupsLoading = useStore(topicGroupsStore.$loading);

  const grouppedLessonKinds = useStore(grouppedLessonKindsStore.$value);
  const grouppedLessonKindsStatus = useStore(grouppedLessonKindsStore.$status);

  const effortUnit = useStore(effortUnitStore.$value);
  const effortUnitStatus = useStore(effortUnitStore.$status);

  const isLoading =
    partTypesLoading || topicGroupsLoading || grouppedLessonKindsStatus === 'pending' || effortUnitStatus === 'pending';

  useEffect(() => {
    return addTopicItem.reset;
  }, []);

  useEffect(() => {
    partTypesStore.get(activityId);
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
    if (createdItemId) {
      history.push(prevPath);
    }
  }, [createdItemId, history, prevPath]);

  const parent = topicGroups.find((group) => group.id === parentId);

  const newTopicItem: FormAddTopicItem = useMemo(
    () => ({
      eduPlanRowId: activityId,
      parent,
      partType: partTypes[0],
      caption: '',
      efforts: normalizeEffortsInMinutes([], grouppedLessonKinds),
    }),
    [activityId, partTypes, grouppedLessonKinds, parent],
  );

  const addTopicItemSchema = useMemo(() => createAddTopicItemSchema(grouppedLessonKinds), [grouppedLessonKinds]);

  if (isLoading) {
    return (
      <Typography as="p" size="12px">
        Загрузка...
      </Typography>
    );
  }

  const onSubmit = (topicItem: FormAddTopicItem) => {
    addTopicItem.add({
      ...topicItem,
      efforts: convertToRawEfforts(topicItem.efforts, grouppedLessonKinds),
    });
  };

  return (
    <div>
      <Formik<FormAddTopicItem>
        initialValues={newTopicItem}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={addTopicItemSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <>
            <FormPrompt isEnabled={!createdItemId} />
            <ActivityTopicItemForm
              title="Добавление темы"
              activityId={activityId}
              validationErrorsStore={addTopicItem.$validationErrors}
              workKinds={grouppedLessonKinds}
              effortUnit={effortUnit}
            />
          </>
        )}
      </Formik>
    </div>
  );
};
