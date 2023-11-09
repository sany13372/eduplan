import { CellProps, Column, GenericTable } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import React, { useCallback, useEffect } from 'react';
import { ErrorMessage } from '@src/components';
import { defaultStudentListState } from '@src/pages/StudentList/model/constants';
import { StudentInfo, StudentListState } from '@src/pages/StudentList/model/types';
import { deleteStudent, resetDomain, studentListInfo } from '@src/pages/StudentList/model';
import '@src/pages/StudentList/model/init';
import { Button } from '@kit-edu/button';
import { DeleteStudentConfirmDialog } from '@src/pages/StudentList/components';

const columns: Column<StudentInfo>[] = [
  {
    Header: 'ФИО',
    accessor: 'fio',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 250,
    width: 250,
    maxWidth: 400,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value;
    },
  },
  {
    Header: 'Почта',
    accessor: 'email',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 300,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Курс',
    accessor: 'course',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 150,
    width: 150,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Источник финансирования',
    accessor: 'financingSource',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 300,
    width: 300,
    maxWidth: 400,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Зачетная книжка',
    accessor: 'bookNumber',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: 'Учебная группа',
    accessor: 'group',
    disableFilters: true,
    disableSortBy: true,
    minWidth: 200,
    width: 200,
    maxWidth: 200,
    Cell: ({ value }: CellProps<StudentInfo>) => {
      return value ?? '';
    },
  },
  {
    Header: '',
    id: 'actions',
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ row }: CellProps<StudentInfo>) => {
      const onClick = () => deleteStudent.setItem(row.original);
      return <Button onClick={onClick} iconLeftName="master-master-delete" size="medium" appearance="dark-outline" />;
    },
  },
];

type StudentListTableProps = {
  eduPlanId: string;
  eduGroupId?: string;
};
export const StudentListTable = ({ eduPlanId, eduGroupId }: StudentListTableProps): JSX.Element => {
  const { totalItemCount, items } = useStore(studentListInfo.$value);
  const status = useStore(studentListInfo.$status);
  const isFail = status === 'fail';
  const isLoading = status === 'pending';
  const getData = useCallback(
    (val: StudentListState) => studentListInfo.get({ eduPlanId, eduGroupId, state: val }),
    [eduGroupId, eduPlanId],
  );
  const delItem = useStore(deleteStudent.$item);
  useEffect(() => resetDomain, []);

  if (isFail) return <ErrorMessage />;

  const emptyListMessage = eduGroupId
    ? 'В учебную группу не включен ни один обучающийся'
    : 'Для плана обучения не добавлен ни один обучающийся';

  return (
    <>
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
        BlankSlate={emptyListMessage}
      />
      <DeleteStudentConfirmDialog />
    </>
  );
};
