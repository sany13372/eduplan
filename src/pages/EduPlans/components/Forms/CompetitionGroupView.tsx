import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { useFormikContext } from 'formik';
import { Label } from '@sber-universe/om-component-library';

export const CompetitionGroupView = <T extends AddEduPlanInfo>(): JSX.Element => {
  const { values } = useFormikContext<T>();

  return (
    <>
      <Label caption="Срок освоения" required>
        {values.competitionPeriod?.caption ?? ''}
      </Label>
      <Label caption="Учебная сетка" required>
        {values.eduGrid?.caption ?? ''}
      </Label>
    </>
  );
};
