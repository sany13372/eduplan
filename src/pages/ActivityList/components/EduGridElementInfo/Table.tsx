import { EduGridItem, EffortUnit, WorkKind } from '@src/pages/ActivityList/model/types';
import React from 'react';
import { useStore } from 'effector-react';
import { effortUnitStore, grouppedLessonKindsStore } from '@src/pages/ActivityList/model';
import { totalEffort } from '@src/pages/ActivityList/model/effforts';
import { FooterCell } from '@src/pages/ActivityList/components/EduGridElementInfo/FooterCell';
import { BodyCell } from '@src/pages/ActivityList/components/EduGridElementInfo/BodyCell';
import { CellProps, Column, FooterProps, Row, SimpleTable } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { Tooltip } from '@kit-edu/tooltip';
import { TitleCell } from '@src/pages/ActivityList/components/EduGridElementInfo/TitleCell';

const columns: Column<EduGridItem>[] = [
  {
    Header: 'Название',
    id: 'title',
    minWidth: 330,
    width: 330,
    maxWidth: 330,
    Cell: ({ row }: CellProps<EduGridItem>) => <TitleCell row={row} />,
    Footer: 'Итого:',
  },
];

type TableProps = {
  data: EduGridItem[];
};

const createColumns = (workKinds: WorkKind[], effortUnit: EffortUnit): Column<EduGridItem>[] => {
  const workKindsColumns = workKinds.map((wk) => ({
    id: wk.id as string,
    Header: () => {
      return (
        <Tooltip
          trigger="mouseenter click"
          appendToId="tooltip-container"
          content={
            <Typography as="p" size="12px" className="whitespace-pre-wrap">
              {wk.caption}
            </Typography>
          }
        >
          <Typography as="p" size="12px">
            {wk.shortTitle}
          </Typography>
        </Tooltip>
      );
    },
    columns: [
      {
        id: `total-${wk.id as string}`,
        Header: 'Всего',
        accessor: (row: EduGridItem) => {
          const idList = wk.lessonKinds.map((e) => e.id);
          return totalEffort(row.efforts.filter((e) => idList.includes(e.lessonKindId)));
        },
        Cell: ({
          row: {
            original: { isGroup },
          },
          value,
        }: CellProps<EduGridItem>) => {
          return <BodyCell isGroup={isGroup} value={value} effortUnit={effortUnit} />;
        },
        Footer: ({ rows }: FooterProps<EduGridItem>) => (
          <FooterCell rows={rows} property={`total-${wk.id as string}`} effortUnit={effortUnit} />
        ),
      } as Column<EduGridItem>,
      ...wk.lessonKinds.map((lk) => ({
        id: lk.id,
        Header: () => {
          return (
            <Tooltip
              trigger="mouseenter click"
              appendToId="tooltip-container"
              content={
                <Typography as="p" size="12px" className="whitespace-pre-wrap">
                  {lk.caption}
                </Typography>
              }
            >
              <Typography as="p" size="12px">
                {lk.shortTitle || lk.caption}
              </Typography>
            </Tooltip>
          );
        },
        accessor: (row: EduGridItem) => {
          const a = row.efforts.find((e) => e.lessonKindId === lk.id && e.workKindId === wk.id);
          return a?.minutesAmount ?? 0;
        },
        Cell: ({
          row: {
            original: { isGroup },
          },
          value,
        }: CellProps<EduGridItem>) => {
          return <BodyCell isGroup={isGroup} value={value} effortUnit={effortUnit} />;
        },
        Footer: ({ rows }: FooterProps<EduGridItem>) => (
          <FooterCell rows={rows} property={lk.id as string} effortUnit={effortUnit} />
        ),
      })),
    ],
  }));
  const totalColumns = [];
  if (effortUnit.unit === 'academic_hours' && effortUnit.doAccountHoursInCreditUnits)
    totalColumns.push({
      id: 'zet',
      Header: 'ЗЕТ',
      accessor: (row: EduGridItem) => totalEffort(row.efforts) / effortUnit.academicHoursInCreditUnitAmount,
      Cell: ({
        row: {
          original: { isGroup },
        },
        value,
      }: CellProps<EduGridItem>) => {
        return <BodyCell isGroup={isGroup} value={value} effortUnit={effortUnit} />;
      },
      Footer: ({ rows }: FooterProps<EduGridItem>) => <FooterCell rows={rows} property="zet" effortUnit={effortUnit} />,
    });
  totalColumns.push({
    id: 'total',
    Header: 'Всего',
    accessor: (row: EduGridItem) => totalEffort(row.efforts),
    Cell: ({
      row: {
        original: { isGroup },
      },
      value,
    }: CellProps<EduGridItem>) => {
      return <BodyCell isGroup={isGroup} value={value} effortUnit={effortUnit} />;
    },
    Footer: ({ rows }: FooterProps<EduGridItem>) => <FooterCell rows={rows} property="total" effortUnit={effortUnit} />,
  });

  return [...columns, ...totalColumns, ...workKindsColumns];
};
export const Table = ({ data }: TableProps): JSX.Element => {
  const workKinds = useStore(grouppedLessonKindsStore.$value);
  const effortUnit = useStore(effortUnitStore.$value);

  return (
    <>
      <div id="tooltip-container" />
      <SimpleTable<EduGridItem>
        columns={createColumns(workKinds, effortUnit)}
        data={data}
        enableExpand
        enableIndexCol={false}
        BlankSlate="В части срока освоения нет мероприятий. Добавьте мероприятие или группу мероприятий."
        getSubRows={(row: EduGridItem) => (row.isGroup ? row.childrens : [])}
        getRowCustomClassList={(row: Row<EduGridItem>) => (row.original.isInvalid ? 'bg-negative-100' : '')}
        getFooterCustomClassList={(rows: Row<EduGridItem>[]) =>
          rows.some(({ original }) => original.isGroup && original.isInvalid) ? 'bg-negative-100' : ''
        }
      />
    </>
  );
};
