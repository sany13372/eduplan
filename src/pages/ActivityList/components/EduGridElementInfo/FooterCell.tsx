import { EduGridItem, EffortUnit } from '@src/pages/ActivityList/model/types';
import { formatEffort, sum } from '@src/pages/ActivityList/model/effforts';
import React, { useMemo } from 'react';
import { Row } from '@sber-universe/om-component-library';

type FooterCellProps = {
  rows: Row<EduGridItem>[];
  property: string;
  effortUnit: EffortUnit;
};
export const FooterCell = ({ property, rows, effortUnit }: FooterCellProps): JSX.Element => {
  const res = useMemo(() => sum(rows.filter((e) => e.depth === 0).map((e) => e.values[property])), [property, rows]);
  return <>{formatEffort(res, effortUnit)}</>;
};
