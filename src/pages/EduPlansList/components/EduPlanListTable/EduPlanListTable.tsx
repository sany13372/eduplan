import { GenericTable } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import React, { useCallback } from 'react';
import { Filters } from '@src/pages/EduPlansList/components';
import { EduPlanListState, EduPlanShortInfo, GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { $eduPlanList, $eduPlanListState, $getEduPlanListStatus, getEduPlanList } from '@src/pages/EduPlansList/model';
import { ErrorMessage } from '@src/components';
import { useEduPlanListColumns } from '@src/pages/EduPlansList/model/hooks';

type EduPlanListTableProps = {
  eduProgId?: string;
};
export const EduPlanListTable = ({ eduProgId }: EduPlanListTableProps): JSX.Element => {
  const { totalItemCount, items } = useStore($eduPlanList);
  const columns = useEduPlanListColumns({ withActions: true });
  const initialState = useStore($eduPlanListState);
  const status = useStore($getEduPlanListStatus);
  const isFail = status === 'fail';
  const isLoading = status === 'pending';
  const getData = useCallback((val: EduPlanListState) => getEduPlanList({ eduProgId, state: val }), [eduProgId]);

  if (isFail) return <ErrorMessage />;

  return (
    <GenericTable<EduPlanShortInfo, GlobalFilterParams>
      columns={columns}
      data={items}
      itemsCount={totalItemCount}
      getData={getData}
      // @ts-ignore
      initialState={initialState}
      GlobalFilter={Filters}
      loading={isLoading}
      manualPagination
      manualGlobalFilter
      manualFilters
    />
  );
};
