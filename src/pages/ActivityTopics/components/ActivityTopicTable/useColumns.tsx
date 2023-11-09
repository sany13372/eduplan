import React, { useMemo } from 'react';
import { EffortKey } from '@src/pages/ActivityList/model/effforts';
import { WorkKind, EffortUnit, TopicRow } from '@src/pages/ActivityTopics/model/types';
import { formatEffort } from '@src/pages/ActivityTopics/model/efforts';
import { Column } from '@sber-universe/om-component-library';
import { TooltipWrapper } from '@src/pages/ActivityTopics/components/ActivityTopicTable/TooltipWrapper';

import { CellContent } from './CellContent';
import { nest } from './utils';

type TCreateColumns = (workKinds: WorkKind[], effortUnit: EffortUnit) => Column<TopicRow>[];

const createColumns: TCreateColumns = (workKinds, effortUnit) => {
  const workKindsColumns = workKinds.map((wk) => ({
    id: wk.id,
    Header: () => {
      return <TooltipWrapper desc={wk.title}>{wk.shortTitle}</TooltipWrapper>;
    },
    columns: [
      {
        id: `total-${wk.id}`,
        Header: 'Всего',
        accessor: (row: TopicRow) => formatEffort(row.efforts[EffortKey.totalWorkKind(wk.id)], effortUnit),
      },
      ...wk.lessonKinds.map(
        (lk) =>
          ({
            id: lk.id,
            Header: () => {
              return <TooltipWrapper desc={lk.title}>{lk.shortTitle}</TooltipWrapper>;
            },
            accessor: (row: TopicRow) => formatEffort(row.efforts[EffortKey.lessonKind(lk.id)], effortUnit),
          } as Column<TopicRow>),
      ),
    ],
  }));

  return [
    nest(1, {
      id: 'title',
      Header: 'Название',
      accessor: 'title',
      // @ts-ignore
      minWidth: '290px',
      width: '300px',
      // @ts-ignore
      maxWidth: '380px',
      Cell: CellContent,
    }),
    nest(1, {
      id: 'total',
      Header: 'Всего',
      accessor: (row: TopicRow) => formatEffort(row.efforts[EffortKey.total], effortUnit),
    }),
    ...workKindsColumns,
    nest(1, {
      id: 'actions',
      Header: '',
      // @ts-ignore
      accessor: 'action',
      // @ts-ignore
      minWidth: '72px',
      width: '72px',
      // @ts-ignore
      maxWidth: '80px',
      Cell: CellContent,
    }),
  ];
};

export const useColumns: TCreateColumns = (workKinds, effortUnit) =>
  useMemo(() => createColumns(workKinds, effortUnit), [workKinds, effortUnit]);
