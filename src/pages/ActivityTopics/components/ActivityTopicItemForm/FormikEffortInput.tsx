import React, { useMemo } from 'react';
import { EffortUnit } from '@src/pages/ActivityTopics/model/types';
import {
  formatEffortInHoursAndMinutes,
  parseEffortInHoursAndMinutes,
  formatEffortInAcademicHours,
  parseEffortInAcademicHours,
} from '@src/pages/ActivityTopics/model/efforts';

import { FormikDurationInput } from './FormikDurationInput';
import { FormatFn, ParseFn } from './DurationInput';

type EffortUnitDisplayParams = {
  unitLabel: string;
  format: FormatFn;
  parse: ParseFn;
};

const displayParamsOf = (effortUnit: EffortUnit): EffortUnitDisplayParams => {
  if (effortUnit.unit === 'academic_hours') {
    return {
      unitLabel: 'ак.ч.',
      format: (totalMinutes) => formatEffortInAcademicHours(totalMinutes, effortUnit.minutesInAcademicHour),
      parse: (text) => parseEffortInAcademicHours(text, effortUnit.minutesInAcademicHour),
    };
  }
  return {
    unitLabel: 'астр.ч.',
    format: formatEffortInHoursAndMinutes,
    parse: parseEffortInHoursAndMinutes,
  };
};

export interface FormikEffortInputProps {
  name: string;
  effortUnit: EffortUnit;
}

export const FormikEffortInput = <T extends Record<string, unknown>>({
  name,
  effortUnit,
}: FormikEffortInputProps): JSX.Element => {
  const params = useMemo(() => displayParamsOf(effortUnit), [effortUnit]);

  return (
    <div className="space-x-8 flex items-center">
      <div className="w-3/4">
        <FormikDurationInput<T> name={name} format={params.format} parse={params.parse} />
      </div>
      <div className="w-1/4">{params.unitLabel}</div>
    </div>
  );
};
