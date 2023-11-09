/* eslint-disable */
import React, { useMemo } from 'react';
import { CellProps, Column, Loader, Notification } from '@sber-universe/om-component-library';
import {
  Activity,
  ActivityRow,
  EduGridElementData,
  GroupRow,
  StudentTrajectory,
  TrajectoryData,
} from '@src/pages/IotManagement/model/types';
import { TrajectoryCell } from '@src/pages/IotManagement/components/EduGridElementInfo/TrajectoryCell';
import { DeleteCell } from '@src/pages/IotManagement/components/EduGridElementInfo/DeleteCell';
import { useStore } from 'effector-react';
import { $newFilters, studentTrajectoryMap } from '@src/pages/IotManagement/model';
import { useTable, ColumnGroup } from 'react-table';
import { TableVirtuoso } from 'react-virtuoso';

import styles from './Table.module.css';
import { SelectCell } from './SelectCell';
import { useHasFilters } from '@src/pages/IotManagement/model/hooks';
import max from 'lodash/max';

const columns: Column<StudentTrajectory>[] = [
  {
    id: 'selectRow',
    width: 100,
    maxWidth: 100,
    Cell: ({ row }: CellProps<StudentTrajectory>) => {
      const { eduGridElementId, isSelected, studentInfo } = row.original;
      const isChecked = isSelected[eduGridElementId];
      return (
        <SelectCell
          gridElementId={eduGridElementId}
          isChecked={isChecked}
          itemId={studentInfo.id}
          key={studentInfo.id}
        />
      );
    },
  },
  {
    Header: 'ФИО',
    id: 'fullName',
    minWidth: 500,
    width: 500,
    maxWidth: 500,
    Cell: ({ row }: CellProps<StudentTrajectory>) => <>{row.original.studentInfo.fullName}</>,
  },
  {
    Header: 'Группа',
    id: 'studentGroup',
    minWidth: 150,
    width: 150,
    maxWidth: 150,
    Cell: ({ row }: CellProps<StudentTrajectory>) => <>{row.original.groupInfo.caption}</>,
  },
];

type TableProps = {
  data: StudentTrajectory[];
  eduGridElement: EduGridElementData;
  activityData: Activity[];
};

const prepareActivityColumn = (activity: ActivityRow): Column<StudentTrajectory> => {
  return {
    Header: activity.activityTitle,
    id: activity.id,
    minWidth: 100,
    width: 100,
    Cell: ({ row }: CellProps<StudentTrajectory>) => {
      const { eduGridElementId, trajectoryList } = row.original;
      const trajectory = trajectoryList.find((e: TrajectoryData) => e.gridElementId === eduGridElementId);
      if (!trajectory) return '';
      return <TrajectoryCell trajectory={trajectory} activityId={activity.id} />;
    },
  };
};

const prepareActivityGroupColumns = (activity: GroupRow): Column<StudentTrajectory> => {
  return {
    Header: activity.activityGroupTitle,
    id: activity.id,
    width: '100px',
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    columns: prepareColumns([], activity.childrens),
  };
};

const prepareActionsColumn = (data: StudentTrajectory[], gridElementId: string): Column<StudentTrajectory>[] => {
  const hasAction = data.find((e) => e.trajectoryList.find((el) => el.gridElementId === gridElementId));
  if (!hasAction) return [];
  return [
    {
      Header: '',
      id: 'actions',
      minWidth: 50,
      width: 50,
      Cell: ({ row }: CellProps<StudentTrajectory>) => {
        const { eduGridElementId, trajectoryList } = row.original;
        const trajectory = trajectoryList.find((e: TrajectoryData) => e.gridElementId === eduGridElementId);
        if (!trajectory) return '';
        return <DeleteCell trajectory={trajectory} />;
      },
    },
  ];
};

const prepareColumns = (
  initColumns: Column<StudentTrajectory>[],
  activityList: Activity[],
): Column<StudentTrajectory>[] => {
  const resp = activityList.map((activity) => {
    if (!activity.isGroup) return prepareActivityColumn(activity);
    return prepareActivityGroupColumns(activity);
  });
  return [...initColumns, ...resp];
};

const getTableHeight = (arr: unknown[], rowHeight: number, headerRows: number) => {
  return (arr.length + headerRows) * rowHeight;
};

function isColGroup(arg: Column): arg is ColumnGroup {
  return Array.isArray((arg as ColumnGroup).columns);
}

const getHeaderRowCount = (cols: Column[], depth: number): number => {
  const resp = cols.map((e) => (isColGroup(e) ? getHeaderRowCount(e.columns, depth + 1) : depth));
  return max(resp) ?? depth;
};

const defaultRowHeight = 53;
const defaultMaxTableHeight = 410;
export const Table = ({ data, eduGridElement, activityData }: TableProps): JSX.Element => {
  const { id: eduGridElementId, iotTemplateCount, planId } = eduGridElement;
  const hasFilters = useHasFilters();
  const { data: rowsData, pagination } = useStore(studentTrajectoryMap.$value);
  const rowsDataUpd = useMemo(() => rowsData.map((e) => ({ ...e, eduGridElementId })), [eduGridElementId, rowsData]);
  const filters = useStore($newFilters);
  const activityDataFiltered = useMemo(
    () => activityData.filter((e) => e.gridElementId === eduGridElementId),
    [activityData, eduGridElementId],
  );
  const studentTrajectoryMapStatus = useStore(studentTrajectoryMap.$status);
  const isLoading = studentTrajectoryMapStatus === 'pending';
  const isDisabled = data.length >= pagination.count;
  const blankSlate = useMemo(() => {
    if (hasFilters) return 'Для указанных фильтров результаты не найдены.';
    if (iotTemplateCount === 0)
      return 'Для части срока освоения не добавлены шаблоны индивидуальных образовательных траекторий, создание индивидуальных образовательных траекторий обучающихся невозможно.';
    return 'Для плана обучения не добавлены обучающиеся';
  }, [iotTemplateCount, hasFilters]);
  const cols = useMemo(
    () => [...prepareColumns(columns, activityDataFiltered), ...prepareActionsColumn(rowsDataUpd, eduGridElementId)],
    [activityDataFiltered, eduGridElementId, rowsDataUpd],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: cols,
    data: rowsDataUpd,
  });

  if (rowsData.length === 0)
    return (
      <Notification
        variant="embedded"
        template={blankSlate}
        icon="master-warning"
        appearance="warning"
        className="px-6"
      />
    );
  return (
    <>
      <TableVirtuoso
        style={{
          height: `${
            getTableHeight(rowsData, defaultRowHeight, getHeaderRowCount(cols as Column[], 1)) > defaultMaxTableHeight
              ? defaultMaxTableHeight
              : getTableHeight(rowsData, defaultRowHeight, getHeaderRowCount(cols as Column[], 1))
          }px`,
        }}
        totalCount={rowsData.length}
        components={{
          Table: ({ style, ...props }) => (
            <table {...getTableProps()} {...props} className={styles.table} style={{ ...style }} />
          ),
          TableBody: React.forwardRef(({ style, ...props }, ref) => (
            <tbody {...getTableBodyProps()} {...props} ref={ref} />
          )),
          TableRow: (props) => {
            // eslint-disable-next-line react/destructuring-assignment
            const index = props['data-index'];
            const row = rows[index];
            return <tr {...props} {...row.getRowProps()} />;
            // return <tr {...props} />;
          },
        }}
        atBottomStateChange={(val) => {
          if (val && !isLoading && !isDisabled)
            studentTrajectoryMap.get({ data: { data, pagination }, planId, filters });
        }}
        fixedHeaderContent={() => {
          return headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
                <th {...column.getHeaderProps()} className="truncate">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ));
        }}
        itemContent={(index) => {
          const row = rows[index];
          prepareRow(row);
          return row.cells.map((cell, i) => {
            // eslint-disable-next-line react/jsx-key
            return (
              <td
                {...cell.getCellProps()}
                style={{ width: cell.column.width, minWidth: cell.column.minWidth, maxWidth: cell.column.maxWidth }}
                key={i}
              >
                {cell.render('Cell')}
              </td>
            );
          });
        }}
      />
      {isLoading && <Loader iconSize={50} />}
    </>
  );
};
