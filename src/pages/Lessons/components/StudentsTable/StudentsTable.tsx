import { Column, GenericTable } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import React, { useCallback, useEffect } from 'react';
import { ErrorMessage } from '@src/components';
import { defaultStudentListState } from '@src/pages/Lessons/model/constants';
import { StudentInfo, StudentListState } from '@src/pages/Lessons/model/types';
import { resetDomain, studentListInfo } from '@src/pages/Lessons/model';

import '@src/pages/Lessons/model/init';
import { studentTableColumns } from './columns';

type StudentTableProps = {
  activityRowId: string;
  implId?: string;
  columns?: Column<StudentInfo>[];
  onGetData?: () => void;
};
export const StudentTable = ({
  activityRowId,
  implId,
  onGetData,
  columns = studentTableColumns,
}: StudentTableProps): JSX.Element => {
  const { totalItemCount, items } = useStore(studentListInfo.$value);
  const status = useStore(studentListInfo.$status);
  const isFail = status === 'fail';
  const isLoading = status === 'pending';
  const getData = useCallback(
    (val: StudentListState) => {
      if (onGetData) onGetData();
      studentListInfo.get({ activityRowId, state: val, implId });
    },
    [activityRowId, implId, onGetData],
  );

  useEffect(() => resetDomain, []);

  if (isFail) return <ErrorMessage />;

  return (
    <GenericTable<StudentInfo, undefined>
      columns={columns}
      data={items}
      itemsCount={totalItemCount}
      getData={getData}
      initialState={defaultStudentListState}
      loading={isLoading}
      manualPagination
      manualGlobalFilter
      manualFilters
      BlankSlate="На занятие не записаны обучающиеся"
    />
  );
};
