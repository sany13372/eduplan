import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { useFormikContext } from 'formik';
import { ComboBox, Label } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import { $competitionPeriodList, $eduGridList } from '@src/pages/EduPlans/model';
import { useEffect, useMemo } from 'react';

export const CompetitionGroupUpdate = <T extends AddEduPlanInfo>(): JSX.Element => {
  const { values, setFieldValue } = useFormikContext<T>();
  const completitionPeriodList = useStore($competitionPeriodList);
  const eduGridListCommon = useStore($eduGridList);
  const { competitionPeriod } = values;
  const eduGridListCurrent = useMemo(
    () => (!competitionPeriod ? [] : eduGridListCommon.filter((e) => e.completionPeriodId === competitionPeriod.id)),
    [competitionPeriod, eduGridListCommon],
  );
  useEffect(() => {
    if (competitionPeriod) {
      setFieldValue('eduGrid', null);
    }
  }, [competitionPeriod, setFieldValue]);
  return (
    <>
      <Label caption="Срок освоения" required>
        <ComboBox<T>
          name="competitionPeriod"
          placeholder="Выберите срок освоения"
          items={completitionPeriodList}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>
      <Label caption="Учебная сетка" required>
        <ComboBox<T>
          name="eduGrid"
          placeholder="Выберите учебную сетку"
          items={eduGridListCurrent}
          disabled={!values.competitionPeriod}
          fullWidth
          // @ts-ignore
          matchWidth
        />
      </Label>
    </>
  );
};
