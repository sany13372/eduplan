import React, { FC } from 'react';
import { SimpleTable } from '@sber-universe/om-component-library';
import { WorkKind, TopicNode, EffortUnit, TopicRow } from '@src/pages/ActivityTopics/model/types';
import { DeleteRowDialog } from '@src/pages/ActivityTopics/components';

import { useColumns } from './useColumns';
import { useRows } from './useRows';

export type ActivityTopicTableProps = {
  workKinds: WorkKind[];
  activityTopics: TopicNode[];
  effortUnit: EffortUnit;
};

export const ActivityTopicTable: FC<ActivityTopicTableProps> = ({ workKinds, activityTopics, effortUnit }) => {
  const columns = useColumns(workKinds, effortUnit);
  const rows = useRows(activityTopics, workKinds);
  return (
    <>
      <SimpleTable<TopicRow>
        columns={columns}
        data={rows}
        enableExpand={false}
        enableIndexCol={false}
        // @ts-ignore
        getRowCustomClassList={() => ''}
        getFooterCustomClassList={() => ''}
        autoResetExpanded={false}
      />
      <div id="tooltip-container" />
      <DeleteRowDialog />
    </>
  );
};
