import { CellProps, Column, SimpleTable } from '@sber-universe/om-component-library';
import { Lesson } from '@src/pages/Lessons/model/types';
import React, { useMemo } from 'react';
import {
  DateCell,
  IsAlwaysAllowCell,
  IsPublicCell,
  SelectAllImplCell,
  SelectImplCell,
  SettingsActionMenu,
  StudentsCell,
  TitleCell,
  TypeCell,
} from '@src/pages/Lessons/components';
import { Typography } from '@kit-edu/typography';
import { AddStudentsButton } from '@src/pages/Lessons/components/SettingsTable/AddStudentsButton';

const columns: Column<Lesson>[] = [
  {
    Header: (el: Column<Lesson>) => {
      // @ts-ignore
      const { data } = el;
      return <SelectAllImplCell data={data} />;
    },
    id: 'selectColumn',
    minWidth: 0,
    width: 100,
    maxWidth: 100,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <SelectImplCell data={row.original} />;
    },
  },
  {
    Header: 'Занятие',
    id: 'title',
    minWidth: 300,
    width: 300,
    maxWidth: 300,
    Cell: ({ row }: CellProps<Lesson>) => {
      const lesson = row.original;
      return (
        <TitleCell data={lesson}>
          <SettingsActionMenu data={lesson} />
        </TitleCell>
      );
    },
  },
  {
    Header: 'Период прохождения не ограничен',
    id: 'isAlwaysAllow',
    minWidth: 150,
    width: 150,
    maxWidth: 150,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <IsAlwaysAllowCell data={row.original} />;
    },
  },
  {
    Header: 'Вид занятия',
    id: 'eduKind',
    minWidth: 250,
    width: 250,
    maxWidth: 250,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <TypeCell data={row.original} />;
    },
  },
  {
    Header: 'Период прохождения',
    id: 'period',
    columns: [
      {
        Header: 'Дата и время начала',
        id: 'startData',
        minWidth: 250,
        width: 250,
        maxWidth: 250,
        Cell: ({ row }: CellProps<Lesson>) => {
          return <DateCell data={row.original} property="startDate" />;
        },
      },
      {
        Header: 'Дата и время окончания',
        id: 'endDate',
        minWidth: 0,
        width: 250,
        maxWidth: 250,
        Cell: ({ row }: CellProps<Lesson>) => {
          return <DateCell data={row.original} property="endDate" />;
        },
      },
    ],
  },
  {
    Header: 'Срок сдачи',
    id: 'passDate',
    minWidth: 0,
    width: 250,
    maxWidth: 250,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <DateCell data={row.original} property="passDate" />;
    },
  },
  {
    Header: 'Обучающиеся',
    id: 'students',
    minWidth: 100,
    width: 100,
    maxWidth: 200,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <StudentsCell data={row.original} />;
    },
  },
  {
    Header: 'Опубликовать',
    id: 'isPublic',
    minWidth: 0,
    width: 100,
    maxWidth: 250,
    Cell: ({ row }: CellProps<Lesson>) => {
      return <IsPublicCell data={row.original} />;
    },
  },
];

type SettingsTableProps = {
  theme: Lesson;
};

export const SettingsTable = ({ theme }: SettingsTableProps) => {
  const data: Lesson[] = useMemo(() => {
    if (theme.elementType === 'group') return theme.groupInfo.childrens;
    return [];
  }, [theme]);

  const filteredData = useMemo(
    () => data.filter((e) => e.elementType === 'lesson' && e.itemInfo.isAllowRegistration),
    [data],
  );
  const title = useMemo(() => {
    if (theme.elementType === 'group') return theme.groupInfo.title;
    return '';
  }, [theme]);

  const emptyMessage = useMemo(
    () =>
      data.length === 0
        ? 'Для темы мероприятия плана обучения не добавлены занятия. Настройка обучения невозможна.'
        : 'Для темы мероприятия плана обучения не согласованы занятия. Настройка обучения невозможна.',
    [data],
  );
  return (
    <div className="space-y-4" data-testid="settingLessonBlock">
      <div className="flex space-x-8 justify-between items-center">
        <Typography as="h3" size="24px" fontWeight="semibold">
          {title}
        </Typography>
        <AddStudentsButton themeId={theme.id} />
      </div>
      <SimpleTable<Lesson>
        columns={columns}
        data={filteredData}
        enableExpand={false}
        enableIndexCol={false}
        BlankSlate={emptyMessage}
        getSubRows={(row: Lesson) => (row.elementType === 'group' ? row.groupInfo.childrens : [])}
        getRowCustomClassList={() => ''}
        getFooterCustomClassList={() => ''}
      />
    </div>
  );
};
