import { FC, useEffect, useMemo } from 'react';
import { Form, useFormikContext } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { Store } from 'effector';
import { useStore } from 'effector-react';
import { Input, ComboBox, Label, FormButtonGroup } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@src/utils/validation';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@constants/routes';
import { Reference, AddTopicGroup, UpdateTopicGroup } from '@src/pages/ActivityTopics/model/types';
import { Typography } from '@kit-edu/typography';

type T = AddTopicGroup | UpdateTopicGroup;

export const noTopicGroup = { id: '', caption: '(нет)' };

export interface ActivityTopicGroupFormProps {
  activityId: string;
  validationErrorsStore: Store<ValidationErrors>;
  title: string;
  topicGroups: Reference[];
  componentKinds: Reference[];
  parentIsSelected: boolean;
}

export const ActivityTopicGroupForm: FC<ActivityTopicGroupFormProps> = ({
  activityId,
  validationErrorsStore,
  title,
  topicGroups,
  componentKinds,
  parentIsSelected,
}) => {
  const history = useHistory();
  const { planId } = useParams<EduPlanActivityParams>();

  const resetClickHandler = () => {
    history.push(getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW, { ':planId': planId, ':activityId': activityId }));
  };
  const validationErrors = useStore(validationErrorsStore);
  const { setStatus, dirty, values } = useFormikContext<T>();
  useEffect(() => setStatus(validationErrors), [validationErrors, setStatus]);

  const topicGroupsWithNoGroupOption = useMemo(() => [noTopicGroup, ...topicGroups], [topicGroups]);
  const parentItemName = useMemo(
    () => topicGroupsWithNoGroupOption.find((e) => e.id === values.parent?.id),
    [topicGroupsWithNoGroupOption, values],
  );
  const parentOptions = useMemo(
    () => topicGroupsWithNoGroupOption.filter((e) => e.id !== values?.id),
    [topicGroupsWithNoGroupOption, values?.id],
  );
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <Form className="flex flex-col space-y-6">
        {topicGroups.length > 0 && (
          <Label caption="Вышестоящий структурный элемент">
            {!parentIsSelected ? (
              <ComboBox<T>
                name="parent"
                placeholder="Выберите вышестоящий структурный элемент"
                items={parentOptions}
                fullWidth
                // @ts-ignore
                matchWidth
              />
            ) : (
              parentItemName?.caption
            )}
          </Label>
        )}
        <Label caption="Вид структурного элемента" required>
          <ComboBox<T>
            name="componentKind"
            placeholder="Выберите вид структурного элемента"
            items={componentKinds}
            fullWidth
            // @ts-ignore
            matchWidth
          />
        </Label>
        <Label caption="Полное название" required>
          <Input<T> name="caption" placeholder="Введите полное название" />
        </Label>
        <Label caption="Сокращённое название">
          <Input<T> name="shortTitle" placeholder="Введите сокращённое название" />
        </Label>
        <FormButtonGroup submitDisabled={!dirty} onResetClick={resetClickHandler} />
      </Form>
    </div>
  );
};
