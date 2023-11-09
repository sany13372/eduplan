import { FC, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { Store } from 'effector';
import { useStore } from 'effector-react';
import { Input, Label, FormButtonGroup } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@src/utils/validation';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@constants/routes';
import { FormAddTopicItem, FormUpdateTopicItem, WorkKind, EffortUnit } from '@src/pages/ActivityTopics/model/types';
import { EffortKey } from '@src/pages/ActivityTopics/model/efforts';
import { Typography } from '@kit-edu/typography';

import { FormikEffortInput } from './FormikEffortInput';

type T = FormAddTopicItem | FormUpdateTopicItem;

export interface ActivityTopicItemFormProps {
  activityId: string;
  validationErrorsStore: Store<ValidationErrors>;
  title: string;
  workKinds: WorkKind[];
  effortUnit: EffortUnit;
}

export const ActivityTopicItemForm: FC<ActivityTopicItemFormProps> = ({
  activityId,
  validationErrorsStore,
  title,
  workKinds,
  effortUnit,
}) => {
  const history = useHistory();
  const { planId } = useParams<EduPlanActivityParams>();

  const resetClickHandler = () => {
    history.push(getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW, { ':planId': planId, ':activityId': activityId }));
  };

  const validationErrors = useStore(validationErrorsStore);
  const { setStatus, dirty } = useFormikContext<T>();
  useEffect(() => setStatus(validationErrors), [validationErrors, setStatus]);

  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <Form className="flex flex-col space-y-6">
        <Label caption="Полное название" required>
          <Input<T> name="caption" placeholder="Введите полное название" />
        </Label>

        <div>
          <div className="text-dark-500 mb-4">Количество часов</div>

          {workKinds.map((wk) => (
            <div key={wk.id} className="ml-8 mt-4 mb-4">
              <div className="text-dark-500">{wk.title}</div>

              {wk.lessonKinds.map((lk) => (
                <div key={lk.id} className="ml-8 mt-4 mb-4" data-testid="fieldBlock">
                  <Label caption={lk.title}>
                    <FormikEffortInput<T>
                      name={`efforts.${EffortKey.lessonKind(lk.id)}` as never}
                      effortUnit={effortUnit}
                    />
                  </Label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <FormButtonGroup submitDisabled={!dirty} onResetClick={resetClickHandler} />
      </Form>
    </div>
  );
};
