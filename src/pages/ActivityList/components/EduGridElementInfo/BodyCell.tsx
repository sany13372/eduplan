import { EffortUnit } from '@src/pages/ActivityList/model/types';
import { formatEffort } from '@src/pages/ActivityList/model/effforts';
import React, { useMemo } from 'react';

type BodyCellProps = {
  isGroup: boolean;
  value: number;
  effortUnit: EffortUnit;
};
export const BodyCell = ({ value, isGroup, effortUnit }: BodyCellProps): JSX.Element => {
  const val = useMemo(() => (!isGroup ? formatEffort(value, effortUnit) : ''), [effortUnit, isGroup, value]);
  return <>{val}</>;
};
