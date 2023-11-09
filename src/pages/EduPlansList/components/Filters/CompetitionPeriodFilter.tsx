/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { $competitionPeriodList } from '@src/pages/EduPlansList/model';
import { ItemProps } from '@kit-edu/selectbox';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { ComboBoxFilter } from '@src/components';
import { defaultCompetitionPeriod } from '@src/pages/EduPlansList/model/constants';

export const CompetitionPeriodFilter = ({
  setGlobalFilter,
  globalFilter,
}: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
  const competitionPeriodList = useStore($competitionPeriodList);
  const options = useMemo(() => {
    return [defaultCompetitionPeriod, ...competitionPeriodList];
  }, [competitionPeriodList]);
  const val = globalFilter?.competitionPeriod ?? defaultCompetitionPeriod;

  const onSelect = (el: ItemProps) => {
    const isDefaultCompetitionPeriod = el.id === defaultCompetitionPeriod.id;
    const competitionPeriodValue = !isDefaultCompetitionPeriod ? el : undefined;
    setGlobalFilter({ ...globalFilter, competitionPeriod: competitionPeriodValue });
  };

  return <ComboBoxFilter label="Срок освоения" value={val} options={options} onSelect={onSelect} />;
};
